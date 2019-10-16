import * as React from 'react';
import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { RootState } from '../../../../state/RootState';
import { GraphQLError } from 'graphql';
import { DeploymentStageEnum, QueryEntity } from '../../../../model/__generated__/globalTypes';
import CostPerDomainWidgetPresenter from './CostPerDomainWidgetPresenter';
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
    costPerDomain: QueryBillingProps;
}

interface CostPerDomain {
    stage: DeploymentStageEnum;
    selectedDomainId: number;
    fromDate: string;
    toDate: string;
    financialYear: string | null;
    setNoDataFlag?: (data: boolean) => void;
}

export const mapStateToProps = (
    state: RootState,
    { costPerDomain: { billingQuery, error, loading } }: GraphQLProps
) => ({
    data: billingQuery,
    loading,
    error: error && error.message
});

// Component
const CostPerDomainWidget = ({ costPerDomain, stage, setNoDataFlag = () => false }: GraphQLProps & CostPerDomain) => {
    useEffect(() => {
        if (costPerDomain.billingQuery && !costPerDomain.billingQuery.length) {
            setNoDataFlag(true);
        }
    });
    if (costPerDomain) {
        const filterData = filteredData(costPerDomain.billingQuery);

        return (
            <CostPerDomainWidgetPresenter
                value={getTotalCost(filterData)}
                stage={stage}
                loading={costPerDomain.loading}
                error={costPerDomain.error && costPerDomain.error.message}
            />
        );
    }
};

export default compose(
    graphql(query, {
        name: 'costPerDomain',
        options: ({ selectedDomainId, stage, fromDate, toDate, financialYear }: CostPerDomain) => ({
            variables: {
                entityId: selectedDomainId,
                entity: QueryEntity.domain,
                fromDate,
                financialYear,
                toDate,
                stage: stage.toLowerCase()
            }
        })
    }),
    connect(mapStateToProps)
)(CostPerDomainWidget);
