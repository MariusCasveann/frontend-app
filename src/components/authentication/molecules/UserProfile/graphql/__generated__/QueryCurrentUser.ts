/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PermissionTypeEnum, SecuredEntityTypeEnum } from './../../../../../../model/__generated__/globalTypes';

// ====================================================
// GraphQL query operation: QueryCurrentUser
// ====================================================

export interface QueryCurrentUser_currentUser_roles_concretePermissions {
    __typename: 'EntityPermission';
    permissionType: PermissionTypeEnum | null;
    id: any | null;
    entityType: SecuredEntityTypeEnum | null;
    entityId: any | null;
}

export interface QueryCurrentUser_currentUser_roles {
    __typename: 'Role';
    id: any | null;
    name: string | null;
    readOnly: boolean | null;
    concretePermissions: (QueryCurrentUser_currentUser_roles_concretePermissions | null)[] | null;
}

export interface QueryCurrentUser_currentUser {
    __typename: 'UserDTO';
    activated: boolean;
    createdBy: string | null;
    createdDate: any | null;
    email: string | null;
    firstName: string | null;
    id: any | null;
    imageContent: string | null;
    langKey: string | null;
    lastModifiedBy: string | null;
    lastModifiedDate: any | null;
    lastName: string | null;
    login: string | null;
    roles: (QueryCurrentUser_currentUser_roles | null)[] | null;
    staticPictureId: any | null;
    subscribedToNewsletter: boolean | null;
}

export interface QueryCurrentUser {
    currentUser: QueryCurrentUser_currentUser | null;
}
