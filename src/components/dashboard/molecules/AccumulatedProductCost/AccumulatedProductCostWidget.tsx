import React from 'react';
import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { QueryEntity } from '../../../../model/__generated__/globalTypes';
import { RootState } from '../../../../state/RootState';
import AccumulatedProductCostWidgetPresenter from './AccumulatedProductCostWidgetPresenter';
import { GraphQLError } from 'graphql';
import { buildAggregatedChartData } from '../../helpers/checkChartData';
import { QueryBilling_billingQuery } from '../common/qraphql/__generated__/QueryBilling';

const query = loader('./../common/qraphql/QueryBilling.graphql');

interface QueryBillingProps {
    billingQuery: QueryBilling_billingQuery[];
    loading: boolean;
    error: GraphQLError;
}

interface GraphQLProps {
    accumulatedProductCost: QueryBillingProps;
}

interface CostFinancialYearWidgetProps {
    selectedProductId: number;
    fromDate: string;
    toDate: string;
    financialYear: number | null;
}

export const mapStateToProps = (
    state: RootState,
    { accumulatedProductCost: { billingQuery, loading, error } }: GraphQLProps
) => ({
    data: billingQuery,
    loading,
    error: error && error.message
});

// Component
const accumulatedProductCostWidget = ({ accumulatedProductCost: { billingQuery, loading, error } }: GraphQLProps) => {
    const chartData = buildAggregatedChartData('Accumulated cost', billingQuery);

    return (
        <AccumulatedProductCostWidgetPresenter
            formattedLabels={(chartData && chartData.formattedLabels) || []}
            chartData={chartData}
            loading={loading}
            error={error && error.message}
        />
    );
};

export default compose(
    graphql(query, {
        name: 'accumulatedProductCost',
        options: ({ selectedProductId, fromDate, toDate, financialYear }: CostFinancialYearWidgetProps) => ({
            variables: {
                entity: QueryEntity.product,
                entityId: selectedProductId,
                financialYear,
                fromDate,
                toDate
            }
        })
    }),
    connect(mapStateToProps)
)(accumulatedProductCostWidget);
