import React from 'react';
import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { QueryEntity } from '../../../../model/__generated__/globalTypes';
import { RootState } from '../../../../state/RootState';
import DomainCostWidgetPresenter from './DomainCostWidgetPresenter';
import { GraphQLError } from 'graphql';
import { buildChartData, formatLabels } from '../../helpers/checkChartData';
import { QueryBilling_billingQuery } from '../common/qraphql/__generated__/QueryBilling';

const query = loader('./../common/qraphql/QueryBilling.graphql');

interface QueryBillingProps {
    billingQuery: QueryBilling_billingQuery[];
    loading: boolean;
    error: GraphQLError;
    financialYear?: string;
}

interface GraphQLProps {
    domainCost: QueryBillingProps;
    messageWhenNoData: string;
}

export const mapStateToProps = (state: RootState, { domainCost: { loading, billingQuery, error } }: GraphQLProps) => ({
    data: billingQuery,
    loading,
    error: error && error.message
});

// Component
const domainCostWidget = ({ domainCost: { billingQuery, loading, error }, messageWhenNoData }: GraphQLProps) => {
    const chartData = buildChartData(billingQuery);
    const formattedLabels = formatLabels(billingQuery);

    return (
        <DomainCostWidgetPresenter
            formattedLabels={formattedLabels}
            chartData={chartData}
            loading={loading}
            error={error && error.message}
            messageWhenNoData={messageWhenNoData}
        />
    );
};

export default compose(
    graphql(query, {
        name: 'domainCost',
        options: ({ financialYear }: QueryBillingProps) => ({
            variables: {
                entity: QueryEntity.domain,
                financialYear
            }
        })
    }),
    connect(mapStateToProps)
)(domainCostWidget);
