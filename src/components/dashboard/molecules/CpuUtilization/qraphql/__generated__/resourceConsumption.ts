/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import {
    DeploymentStageEnum,
    ResourceTypeEnum,
    ResourceAggregationTypeEnum,
    QueryEntity
} from './../../../../../../model/__generated__/globalTypes';

// ====================================================
// GraphQL query operation: ResourceConsumption
// ====================================================

export interface ResourceConsumption_resourceConsumption {
    __typename: 'ResourceConsumptionDTO';
    projectId: string | null;
    resourceType: string | null;
    usage: string | null;
    usageDate: any | null;
}

export interface ResourceConsumption {
    resourceConsumption: (ResourceConsumption_resourceConsumption | null)[] | null;
}

export interface ResourceConsumptionVariables {
    entityId?: any | null;
    deploymentStage?: DeploymentStageEnum | null;
    resourceType?: ResourceTypeEnum | null;
    aggregationType?: ResourceAggregationTypeEnum | null;
    entityType?: QueryEntity | null;
}
