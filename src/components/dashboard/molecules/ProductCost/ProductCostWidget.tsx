import React from 'react';
import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { QueryEntity } from '../../../../model/__generated__/globalTypes';
import { RootState } from '../../../../state/RootState';
import ProductCostWidgetPresenter from './ProductCostWidgetPresenter';
import { GraphQLError } from 'graphql';
import { buildAggregatedChartData } from '../../helpers/checkChartData';
import { QueryBilling_billingQuery } from '../common/qraphql/__generated__/QueryBilling';

const query = loader('../common/qraphql/QueryBilling.graphql');

interface QueryBillingProps {
    billingQuery: QueryBilling_billingQuery[];
    loading: boolean;
    error: GraphQLError;
}

interface GraphQLProps {
    productCost: QueryBillingProps;
}

interface ProductCostWidgetProps {
    selectedDomaintId: number;
    fromDate: string;
    toDate: string;
    financialYear: number;
}

export const mapStateToProps = (state: RootState, { productCost: { billingQuery, loading, error } }: GraphQLProps) => ({
    data: billingQuery,
    loading,
    error: error && error.message
});

// Component
const productCostWidget = ({ productCost: { billingQuery, loading, error } }: GraphQLProps) => {
    const chartData = buildAggregatedChartData('Product cost', billingQuery);

    return (
        <ProductCostWidgetPresenter
            formattedLabels={(chartData && chartData.formattedLabels) || []}
            chartData={chartData}
            loading={loading}
            error={error && error.message}
        />
    );
};

export default compose(
    graphql(query, {
        name: 'productCost',
        options: ({ fromDate, toDate, selectedDomaintId, financialYear }: ProductCostWidgetProps) => ({
            variables: {
                entity: QueryEntity.domainProduct,
                entityId: selectedDomaintId,
                financialYear,
                fromDate,
                toDate
            }
        })
    }),
    connect(mapStateToProps)
)(productCostWidget);
