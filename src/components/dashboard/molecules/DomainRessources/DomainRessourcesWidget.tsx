import React from 'react';
import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { QueryEntity } from '../../../../model/__generated__/globalTypes';
import { RootState } from '../../../../state/RootState';
import DomainRessourcesWidgetPresenter from './DomainRessourcesWidgetPresenter';
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
    domainRessources: QueryBillingProps;
}

interface DomainRessourcesWidgetProps {
    selectedDomaintId: number;
    fromDate: string;
    toDate: string;
    financialYear: string | null;
}

export const mapStateToProps = (
    state: RootState,
    { domainRessources: { billingQuery, loading, error } }: GraphQLProps
) => ({
    data: billingQuery,
    loading,
    error: error && error.message
});

// Component
const domainRessourcesWidget = ({ domainRessources: { billingQuery, loading, error } }: GraphQLProps) => {
    const chartData = buildAggregatedChartData('Domain Ressources Cost', billingQuery);

    return (
        <DomainRessourcesWidgetPresenter
            formattedLabels={(chartData && chartData.formattedLabels) || []}
            chartData={chartData}
            loading={loading}
            error={error && error.message}
        />
    );
};

export default compose(
    graphql(query, {
        name: 'domainRessources',
        options: ({ fromDate, toDate, selectedDomaintId, financialYear }: DomainRessourcesWidgetProps) => ({
            variables: {
                entity: QueryEntity.domain,
                entityId: selectedDomaintId,
                fromDate,
                financialYear,
                toDate
            }
        })
    }),
    connect(mapStateToProps)
)(domainRessourcesWidget);
