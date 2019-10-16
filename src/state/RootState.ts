import { AuthenticationState } from './authentication/AuthenticationState';
import { ProductsState } from './products/ProductsState';

interface AppState {
    authentication: AuthenticationState;
    products: ProductsState;
}

export interface RootState {
    app: AppState;
}
