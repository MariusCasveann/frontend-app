import { Action } from 'redux';
import { QueryAllProducts_allProducts } from '../../components/dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';

export enum ProductsActionTypes {
    setSelectedProduct = 'SET_SELECTED_PRODUCT'
}

export interface SetSelectedProduct extends Action<ProductsActionTypes.setSelectedProduct> {
    payload: {
        selectedProduct: QueryAllProducts_allProducts;
    };
}

export const ProductsActionCreators = {
    setSelectedProduct: (payload: { selectedProduct: QueryAllProducts_allProducts }): SetSelectedProduct => ({
        type: ProductsActionTypes.setSelectedProduct,
        payload
    })
};
