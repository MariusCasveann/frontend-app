import { combineReducers } from 'redux';
import { AuthenticationReducer } from './authentication/AuthenticationReducer';
import { ProductsReducer } from './products/ProductsReducer';

/**
 * Root reducer
 *
 * please not that every reducer, per default, gets its own, private, place in the store
 * you may define this place's name here:
 *
 * combineReducers({
 *     <nameOfTheReducersPrivateSpace>: <theReducerItself>
 * });
 *
 * as this reducer is going to be combined with the apollo and react-router reducer,
 * everything is prefixed with <pre>app</pre>, * which means that in the end you will access your
 * properties with state.app.<nameOfTheReducersPrivateSpace>. ...
 *
 * @type {Reducer<S>}
 */
export const appReducer = combineReducers({
    authentication: AuthenticationReducer,
    products: ProductsReducer
});
