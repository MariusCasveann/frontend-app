import { Reducer } from 'redux';
import { ProductsActionTypes } from './ProductsActions';
import { ProductsState, initialState } from './ProductsState';

export const ProductsReducer: Reducer<ProductsState> = (state = initialState, action) => {
    switch (action.type) {
        case ProductsActionTypes.setSelectedProduct: {
            return {
                ...state,
                selectedProduct: action.payload.selectedProduct
            };
        }
        default:
            return state;
    }
};
