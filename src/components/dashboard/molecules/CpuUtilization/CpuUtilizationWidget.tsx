import React from 'react';
import { loader } from 'graphql.macro';
import { compose, graphql, QueryOpts } from 'react-apollo';
import { connect } from 'react-redux';
import {
    QueryEntity,
    DeploymentStageEnum,
    ResourceTypeEnum,
    ResourceAggregationTypeEnum
} from '../../../../model/__generated__/globalTypes';
import { RootState } from '../../../../state/RootState';
import { GraphQLError } from 'graphql';
import CpuUtilizationWidgetPresenter from './CpuUtilizationWidgetPresenter';
import { ResourceConsumption_resourceConsumption } from './qraphql/__generated__/resourceConsumption';
import { nightblue, lightNightblue, grey } from '../../../../config/colors';

const query = loader('./qraphql/ResourceConsumption.graphql');

interface GraphQLProps {
    dev: DResourceConsumptionProps;
    prod: DResourceConsumptionProps;
}

interface DResourceConsumptionProps {
    loading: boolean;
    error: GraphQLError;
    resourceConsumption: ResourceConsumption_resourceConsumption[];
}

interface CpuUtilizationWidgetProps {
    selectedProductId: number;
    fromDate: string;
    toDate: string;
}

export const mapStateToProps = (state: RootState, { dev, prod }: GraphQLProps) => ({
    dataDev: dev.resourceConsumption,
    dataProd: prod.resourceConsumption,
    loadingDev: dev.loading,
    loadingProd: prod.loading,
    errorDev: dev.error && dev.error.message,
    errorProd: prod.error && prod.error.message
});

export const buildChartData = (
    dataDev: ResourceConsumption_resourceConsumption[] | null,
    dataProd: ResourceConsumption_resourceConsumption[] | null
) => {
    const dev = dataDev && dataDev[0] && dataDev[0].usage;
    const prod = dataProd && dataProd[0] && dataProd[0].usage;
    const labels = dev || prod ? ['Dev', 'Prod', 'Not used'] : [];

    if (dataDev && dataProd) {
        return {
            labels,
            datasets: [
                {
                    label: 'Dev',
                    backgroundColor: [nightblue, grey],
                    data: [Number(dev) * 100, 100 - Number(dev) * 100]
                },
                {
                    label: 'Prod',
                    backgroundColor: [lightNightblue, grey],
                    data: [Number(prod) * 100, 100 - Number(prod) * 100]
                }
            ]
        };
    }
};

// Component
const cpuWidgetPresenter = ({ dev, prod }: GraphQLProps) => {
    const chartData = buildChartData(dev.resourceConsumption, prod.resourceConsumption);
    const loading = dev.loading && prod.loading;
    const error = (dev.error && dev.error.message) || (prod.error && prod.error.message);
    return <CpuUtilizationWidgetPresenter chartData={chartData} loading={loading} error={error} />;
};

const getQueryVariables = (
    entityId: number,
    fromDate: string,
    toDate: string,
    deploymentStage: DeploymentStageEnum
): QueryOpts => ({
    variables: {
        entityId,
        entity: QueryEntity.product,
        deploymentStage,
        aggregationType: ResourceAggregationTypeEnum.SINGLE,
        resourceType: ResourceTypeEnum.CPU,
        entityType: QueryEntity.product,
        fromDate,
        toDate
    }
});

export default compose(
    graphql(query, {
        name: 'dev',
        options: ({ selectedProductId, fromDate, toDate }: CpuUtilizationWidgetProps) =>
            getQueryVariables(selectedProductId, fromDate, toDate, DeploymentStageEnum.DEV)
    }),
    graphql(query, {
        name: 'prod',
        options: ({ selectedProductId, fromDate, toDate }: CpuUtilizationWidgetProps) =>
            getQueryVariables(selectedProductId, fromDate, toDate, DeploymentStageEnum.PROD)
    }),
    connect(mapStateToProps)
)(cpuWidgetPresenter);
