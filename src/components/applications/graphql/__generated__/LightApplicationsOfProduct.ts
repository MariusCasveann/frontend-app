/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LightApplicationsOfProduct
// ====================================================

export interface LightApplicationsOfProduct_lightApplicationsOfProduct {
    __typename: 'LightApplicationDTO';
    id: any | null;
    name: string | null;
    service: boolean;
    staticPictureId: any | null;
}

export interface LightApplicationsOfProduct {
    lightApplicationsOfProduct: (LightApplicationsOfProduct_lightApplicationsOfProduct | null)[] | null;
}

export interface LightApplicationsOfProductVariables {
    productId?: any | null;
}
