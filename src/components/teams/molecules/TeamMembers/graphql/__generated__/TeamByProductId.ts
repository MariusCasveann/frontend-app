/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TeamByProductId
// ====================================================

export interface TeamByProductId_teamByProductId_productOwner {
    __typename: 'User';
    firstName: string | null;
    lastName: string | null;
    id: any | null;
}

export interface TeamByProductId_teamByProductId_teamMembers_roles {
    __typename: 'Role';
    name: string | null;
}

export interface TeamByProductId_teamByProductId_teamMembers {
    __typename: 'User';
    firstName: string | null;
    lastName: string | null;
    id: any | null;
    email: string | null;
    roles: (TeamByProductId_teamByProductId_teamMembers_roles | null)[] | null;
}

export interface TeamByProductId_teamByProductId {
    __typename: 'Team';
    id: any | null;
    productOwner: TeamByProductId_teamByProductId_productOwner | null;
    teamMembers: (TeamByProductId_teamByProductId_teamMembers | null)[] | null;
}

export interface TeamByProductId {
    teamByProductId: TeamByProductId_teamByProductId | null;
}

export interface TeamByProductIdVariables {
    productId?: any | null;
}
