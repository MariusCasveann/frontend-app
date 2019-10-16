/**
 * Products state
 */
import { QueryAllProducts_allProducts } from '../../components/dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';

// constants
import { ALL } from '../../utils/constants';

export interface ProductsState {
    selectedProduct: QueryAllProducts_allProducts;
}

export const ALL_PRODUCTS_ITEM: QueryAllProducts_allProducts = {
    __typename: 'LightProductDTO',
    id: ALL,
    logo: ALL,
    name: 'All Products'
};

/**
 * Products initial state
 */
export const initialState: ProductsState = {
    selectedProduct: ALL_PRODUCTS_ITEM
};
