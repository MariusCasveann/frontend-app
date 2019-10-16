/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum DeploymentStageEnum {
    DEV = 'DEV',
    PROD = 'PROD'
}

export enum PermissionTypeEnum {
    READ = 'READ',
    WRITE = 'WRITE'
}

export enum QueryEntity {
    domain = 'domain',
    domainProduct = 'domainProduct',
    product = 'product'
}

export enum ResourceAggregationTypeEnum {
    DAILY = 'DAILY',
    HOURLY = 'HOURLY',
    MONTHLY = 'MONTHLY',
    SINGLE = 'SINGLE'
}

export enum ResourceTypeEnum {
    CPU = 'CPU',
    NUMBER_OF_BUILDS = 'NUMBER_OF_BUILDS'
}

export enum SecuredEntityTypeEnum {
    APPLICATION = 'APPLICATION',
    CUSTOMER = 'CUSTOMER',
    DOMAIN = 'DOMAIN',
    PARENT_FOLDER = 'PARENT_FOLDER',
    PRODUCT = 'PRODUCT',
    SERVICE_SECTION = 'SERVICE_SECTION'
}

export interface RoleInput {
    id?: any | null;
    name?: string | null;
    readOnly?: boolean | null;
}

export interface TeamInput {
    id?: any | null;
    productOwner?: UserInput | null;
    teamMembers?: (UserInput | null)[] | null;
}

export interface UserInput {
    resetDate?: any | null;
    login?: string | null;
    lastName?: string | null;
    email?: string | null;
    id?: any | null;
    activated: boolean;
    staticPictureId?: any | null;
    logo?: string | null;
    langKey?: string | null;
    roles?: (RoleInput | null)[] | null;
    firstName?: string | null;
    subscribedToNewsletter?: boolean | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
