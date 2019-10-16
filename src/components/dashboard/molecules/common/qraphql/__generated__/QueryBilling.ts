/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { QueryEntity } from './../../../../../../model/__generated__/globalTypes';

// ====================================================
// GraphQL query operation: QueryBilling
// ====================================================

export interface QueryBilling_billingQuery {
    __typename: 'GoogleBillingResultDTO';
    resourceType: string | null;
    cost: any | null;
    date: any | null;
    currency: string | null;
}

export interface QueryBilling {
    billingQuery: (QueryBilling_billingQuery | null)[] | null;
}

export interface QueryBillingVariables {
    entity?: QueryEntity | null;
    entityId?: number | null;
    stage?: string | null;
    financialYear?: number | null;
    toDate?: any | null;
    fromDate?: any | null;
}
