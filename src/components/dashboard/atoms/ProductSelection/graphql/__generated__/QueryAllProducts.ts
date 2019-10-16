/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryAllProducts
// ====================================================

export interface QueryAllProducts_allProducts {
    __typename: 'LightProductDTO';
    id: any | null;
    logo: string | null;
    name: string | null;
}

export interface QueryAllProducts {
    allProducts: (QueryAllProducts_allProducts | null)[] | null;
}
