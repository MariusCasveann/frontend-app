/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ResourceTypeEnum, QueryEntity } from './../../../../../../model/__generated__/globalTypes';

// ====================================================
// GraphQL query operation: ResourceConsumption
// ====================================================

export interface ResourceConsumption_resourceConsumption {
    __typename: 'ResourceConsumptionDTO';
    projectId: string | null;
    usage: string | null;
}

export interface ResourceConsumption {
    resourceConsumption: (ResourceConsumption_resourceConsumption | null)[] | null;
}

export interface ResourceConsumptionVariables {
    entityId?: any | null;
    resourceType?: ResourceTypeEnum | null;
    entityType?: QueryEntity | null;
    toDate?: any | null;
    fromDate?: any | null;
}
