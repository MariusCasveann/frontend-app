import * as React from 'react';
import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { RootState } from '../../../../state/RootState';
import { GraphQLError } from 'graphql';
import { QueryEntity } from '../../../../model/__generated__/globalTypes';
import MonthlyCostPerDomainWidgetPresenter from './MonthlyCostPerDomainWidgetPresenter';
import { lightNightblue } from '../../../../config/colors';
import { QueryBilling_billingQuery } from '../common/qraphql/__generated__/QueryBilling';
import { useEffect } from 'react';

const query = loader('./../common/qraphql/QueryBilling.graphql');

interface QueryBillingProps {
    billingQuery: QueryBilling_billingQuery[] | null;
    loading: boolean;
    error: GraphQLError;
}

interface GraphQLProps {
    monthlyCostPerDomain: QueryBillingProps;
    setNoDataFlag?: (data: boolean) => void;
}

interface MonthlyCostPerDomain {
    selectedDomainId: number;
    fromDate: string;
    toDate: string;
    financialYear: string | null;
}

const mapStateToProps = (
    state: RootState,
    { monthlyCostPerDomain: { billingQuery, error, loading } }: GraphQLProps
) => ({
    data: billingQuery,
    loading,
    error: error && error.message
});

export const buildChartData = (data?: QueryBilling_billingQuery[] | null) => {
    if (data) {
        const filterData = data && data.filter(e => e && e.cost);

        // Sum up all costs for for the product
        const result = new Map();
        filterData.forEach(element => {
            if (result.get(element.resourceType)) {
                result.set(element.resourceType, result.get(element.resourceType) + element.cost);
            } else {
                result.set(element.resourceType, element.cost);
            }
        });

        // Get all products
        const productLabels: string[] = [];
        result.forEach((value, key) => {
            productLabels.push(key);
        });

        // Get all costs
        let costsPerProduct: number[] = [];
        result.forEach(value => {
            costsPerProduct.push(value);
        });
        costsPerProduct = costsPerProduct.map(element => Number(element.toFixed(2)));
        const currency = (data && data[0] && data[0].currency) || '';

        return {
            labels: productLabels,
            datasets: [
                {
                    label: `Monthly cost in ${currency}`,
                    backgroundColor: lightNightblue,
                    data: costsPerProduct || []
                }
            ]
        };
    }
};

// Component
const MonthlyCostPerDomainWidget = ({ monthlyCostPerDomain, setNoDataFlag = () => false }: GraphQLProps) => {
    useEffect(() => {
        if (monthlyCostPerDomain.billingQuery && !monthlyCostPerDomain.billingQuery.length) {
            setNoDataFlag(true);
        }
    });
    if (monthlyCostPerDomain) {
        const chartData = buildChartData(monthlyCostPerDomain.billingQuery);

        return (
            <MonthlyCostPerDomainWidgetPresenter
                chartData={chartData}
                loading={monthlyCostPerDomain.loading}
                error={monthlyCostPerDomain.error && monthlyCostPerDomain.error.message}
            />
        );
    }
};

export default compose(
    graphql(query, {
        name: 'monthlyCostPerDomain',
        options: ({ selectedDomainId, fromDate, toDate, financialYear }: MonthlyCostPerDomain) => ({
            variables: {
                entityId: selectedDomainId,
                entity: QueryEntity.domainProduct,
                fromDate,
                financialYear,
                toDate
            }
        })
    }),
    connect(mapStateToProps)
)(MonthlyCostPerDomainWidget);
