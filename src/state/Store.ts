import { History } from 'history';
import { applyMiddleware, combineReducers, compose, createStore, Middleware } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { config } from '../config';
import { appReducer } from './AppReducer';
import { registerAllDPSagas } from './SagaRegistry';
import { apolloClient } from '../config/apolloConfig';
const sagaMiddleware = createSagaMiddleware();

export function configureStore(history: History) {
    const reduxMiddleware: Middleware[] = [sagaMiddleware];

    let composeEnhancers = compose;

    if (config.redux.loggingEnabled) {
        if ('__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' in window) {
            // tslint:disable-next-line:no-any
            composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
        }
        reduxMiddleware.push(logger);
    }

    const store = createStore(
        combineReducers({
            app: appReducer
        }),
        composeEnhancers(applyMiddleware(...reduxMiddleware))
    );

    // register sagas
    registerAllDPSagas(sagaMiddleware, apolloClient);

    return store;
}
