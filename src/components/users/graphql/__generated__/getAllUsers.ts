/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllUsers
// ====================================================

export interface getAllUsers_allUsers {
    __typename: 'UserDTO';
    login: string | null;
    id: any | null;
    firstName: string | null;
    lastName: string | null;
}

export interface getAllUsers {
    allUsers: (getAllUsers_allUsers | null)[] | null;
}

export interface getAllUsersVariables {
    search?: string | null;
}
