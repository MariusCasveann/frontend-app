import { flatten } from 'lodash';
import { SagaMiddleware } from 'redux-saga';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client/ApolloClient';
import authentication from './authentication/AuthenticationSaga';

/**
 * List of all sagas
 */

const allSagas: any[] = [authentication];

/**
 * This method will register all sagas on the provided saga middleware
 * @param {SagaMiddleware<T>} middleware
 * @param {ApolloClient} apolloClient
 * @returns {Task[]}
 */

export const registerAllDPSagas = <T extends object>(
    middleware: SagaMiddleware<T>,
    apolloClient: ApolloClient<NormalizedCacheObject>
) => flatten(allSagas).map(sagaCreator => middleware.run(sagaCreator(apolloClient)));
