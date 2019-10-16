import * as React from 'react';
import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { RootState } from '../../../../state/RootState';
import { GraphQLError } from 'graphql';
import { DeploymentStageEnum, QueryEntity } from '../../../../model/__generated__/globalTypes';
import CostPerProductWidgetPresenter from './CostPerProductWidgetPresenter';
import { filteredData, getTotalCost } from '../../helpers/checkChartData';
import { QueryBilling_billingQuery } from '../common/qraphql/__generated__/QueryBilling';
import { useEffect } from 'react';

const query = loader('./../common/qraphql/QueryBilling.graphql');

interface QueryBillingProps {
    billingQuery: QueryBilling_billingQuery[];
    loading: boolean;
    error: GraphQLError;
}

interface GraphQLProps {
    costPerProduct: QueryBillingProps;
}

interface CostPerProduct {
    stage: DeploymentStageEnum;
    selectedProductId: number;
    fromDate: string;
    toDate: string;
    financialYear: string | null;
    setNoDataFlag?: (data: boolean) => void;
}

// Component
const CostPerProductWidget = ({
    costPerProduct,
    stage,
    setNoDataFlag = () => false
}: GraphQLProps & CostPerProduct) => {
    useEffect(() => {
        if (costPerProduct.billingQuery && !costPerProduct.billingQuery.length) {
            setNoDataFlag(true);
        }
    });
    if (costPerProduct) {
        const filterData = filteredData(costPerProduct.billingQuery);

        return (
            <CostPerProductWidgetPresenter
                value={getTotalCost(filterData)}
                stage={stage}
                loading={costPerProduct.loading}
                error={costPerProduct.error && costPerProduct.error.message}
            />
        );
    }
};

export const mapStateToProps = (
    state: RootState,
    { costPerProduct: { billingQuery, error, loading } }: GraphQLProps
) => ({
    data: billingQuery,
    loading,
    error: error && error.message
});

export default compose(
    graphql(query, {
        name: 'costPerProduct',
        options: ({ selectedProductId, stage, fromDate, toDate, financialYear }: CostPerProduct) => ({
            variables: {
                entityId: selectedProductId,
                entity: QueryEntity.product,
                fromDate,
                financialYear,
                toDate,
                stage: stage.toLowerCase()
            }
        })
    }),
    connect(mapStateToProps)
)(CostPerProductWidget);
