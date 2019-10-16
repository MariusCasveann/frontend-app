import { QueryAllProducts_allProducts } from '../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { ALL } from '../../../utils/constants';

export const getProductId = (selectedProduct: QueryAllProducts_allProducts) =>
    selectedProduct && selectedProduct.id !== ALL ? selectedProduct.id : null;
