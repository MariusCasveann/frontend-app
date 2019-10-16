import * as React from 'react';
import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { RootState } from '../../../../state/RootState';
import { GraphQLError } from 'graphql';
import { DeploymentStageEnum, QueryEntity } from '../../../../model/__generated__/globalTypes';
import MonthlyCostPerStagePresenter from './MonthlyCostPerStagePresenter';
import { filteredData } from '../../helpers/checkChartData';
import { QueryBilling_billingQuery } from '../common/qraphql/__generated__/QueryBilling';
import { useEffect } from 'react';

const query = loader('./../common/qraphql/QueryBilling.graphql');

interface QueryBillingProps {
    billingQuery: QueryBilling_billingQuery[];
    loading: boolean;
    error: GraphQLError;
}

interface GraphQLProps {
    costPerStage: QueryBillingProps;
}

interface MonthlyCostPerStage {
    stage: DeploymentStageEnum;
    selectedDomainId: number;
    fromDate: string;
    toDate: string;
    financialYear: string | null;
    setNoDataFlag?: (data: boolean) => void;
}

export const mapStateToProps = (
    state: RootState,
    { costPerStage: { billingQuery, error, loading } }: GraphQLProps
) => ({
    data: billingQuery,
    loading,
    error: error && error.message
});

// Component
const MonthlyCostPerStage = ({
    stage,
    costPerStage,
    setNoDataFlag = () => false
}: GraphQLProps & MonthlyCostPerStage) => {
    useEffect(() => {
        if (costPerStage.billingQuery && !costPerStage.billingQuery.length) {
            setNoDataFlag(true);
        }
    });
    if (costPerStage) {
        const filterData = filteredData(costPerStage.billingQuery);
        const totalCost =
            (filterData && filterData.reduce((total, costs) => Number((total + costs.cost).toFixed(2)), 0)) || 0;
        const currency = (filterData && filterData[0] && filterData[0].currency) || '';

        return (
            <MonthlyCostPerStagePresenter
                currency={currency}
                value={totalCost}
                stage={stage}
                loading={costPerStage.loading}
                error={costPerStage.error && costPerStage.error.message}
            />
        );
    }
};

export default compose(
    graphql(query, {
        name: 'costPerStage',
        options: ({ selectedDomainId, stage, fromDate, toDate, financialYear }: MonthlyCostPerStage) => ({
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
)(MonthlyCostPerStage);
