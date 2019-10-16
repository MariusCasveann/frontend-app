import React from 'react';
import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { QueryEntity, ResourceTypeEnum } from '../../../../model/__generated__/globalTypes';

import { GraphQLError } from 'graphql';

import { colors } from '../../../../config/colors';
import { ResourceConsumption_resourceConsumption } from '../CpuUtilization/qraphql/__generated__/resourceConsumption';
import DeploymentFrequencyWidgetPresenter from './DeploymentFrequencyWidgetPresenter';
import { QueryAllDomains_allDomains } from '../../atoms/DomainSelection/graphql/__generated__/QueryAllDomains';
import { fiscalYearEnd, fiscalYearStart } from '../../../../utils/fiscalYear';

const query = loader('./graphql/DeploymentFrequency.graphql');

interface DeploymentFrequencyProp {
    resourceConsumption: ResourceConsumption_resourceConsumption[];
    loading: boolean;
    error: GraphQLError;
}

interface DeploymentFrequencyWidgetProps {
    deploymentFrequency: DeploymentFrequencyProp;
    showTotalBuilds: boolean;
    fromDate: string;
    toDate: string;
    entityType?: string;
    messageWhenNoData?: string;
    selectedEntityState?: QueryAllDomains_allDomains;
}

export const buildChartData = (resourceConsumption: ResourceConsumption_resourceConsumption[]) => {
    const labels = (resourceConsumption && resourceConsumption.map(item => (item && item.projectId) || '')) || [];
    const data = resourceConsumption && resourceConsumption.map(item => Number(item.usage));

    return {
        labels: labels || [],
        datasets: [
            {
                backgroundColor: colors,
                data,
                label: 'Deployment Frequency KPIs'
            }
        ]
    };
};

export const formatLabels = (resourceConsumption: ResourceConsumption_resourceConsumption[]) =>
    (resourceConsumption && resourceConsumption.map(item => (item && `${item.projectId} (${item.usage})`) || '')) || [];

const deploymentWidgetPresenter = ({
    showTotalBuilds = true,
    messageWhenNoData,
    deploymentFrequency: { resourceConsumption, loading, error }
}: DeploymentFrequencyWidgetProps) => {
    const formattedLabels = formatLabels(resourceConsumption);
    const chartData = buildChartData(resourceConsumption);
    const totalUsage =
        (resourceConsumption && resourceConsumption.reduce((total, usages) => total + Number(usages.usage || 0), 0)) ||
        0;

    return (
        <DeploymentFrequencyWidgetPresenter
            total={totalUsage}
            chartData={chartData}
            showTotalBuilds={showTotalBuilds}
            formattedLabels={formattedLabels}
            error={error && error.message}
            loading={loading}
            messageWhenNoData={messageWhenNoData}
        />
    );
};

export default compose(
    graphql(query, {
        name: 'deploymentFrequency',
        options: ({
            selectedEntityState,
            fromDate = fiscalYearStart,
            toDate = fiscalYearEnd,
            entityType = QueryEntity.domain
        }: DeploymentFrequencyWidgetProps) => ({
            variables: {
                entityId: selectedEntityState && selectedEntityState.id,
                resourceType: ResourceTypeEnum.NUMBER_OF_BUILDS,
                entityType,
                fromDate,
                toDate
            }
        })
    }),
    connect()
)(deploymentWidgetPresenter);
