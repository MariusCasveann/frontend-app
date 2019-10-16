import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { AnyAction } from 'redux';
import { SagaType } from 'redux-saga-test-plan';
import { actionChannel, call, ForkEffect, take, takeEvery } from 'redux-saga/effects';
import { buffers } from 'redux-saga';

/* In the following lines you find types which aim to be a basic
 * of what we defined as a "saga"
 */

export type SagaReturnType = Iterator<{}>;
export type Saga = (...args: AnyAction[]) => SagaReturnType;
export type ActionType = AnyAction['type'];
export type SagaWithApolloClient = (apolloClient: ApolloClient<NormalizedCacheObject>) => Saga & SagaType;
export type SagaWithoutApolloClient = () => Saga & SagaType;
export type SagaTakeOptionType = (actionType: ActionType, saga: Saga) => ForkEffect;

/**
 * Creates a saga registration, so that we do not need to duplicate the code so often
 * The take option defaults to takeEvery
 * @param {SagaWithApolloClient} sagaCreator
 * @param {ActionType} actionType
 * @param {SagaTakeOptionType} sagaTakeOption
 * @returns {(apolloClient: ApolloClient) => () => SagaReturnType}
 */
export const createSagaRegistration = (
    sagaCreator: SagaWithApolloClient | SagaWithoutApolloClient,
    actionType: ActionType,
    sagaTakeOption: SagaTakeOptionType = takeEvery
) => (apolloClient: ApolloClient<NormalizedCacheObject>): Saga =>
    function*(): SagaReturnType {
        yield sagaTakeOption(actionType, sagaCreator(apolloClient));
    };

/**
 * Creates a saga queue, that buffers saga calls and execute them synchronously
 * @param sagaCreator
 * @param actionType
 * @param queueSize
 */
export const createSagaQueue = (sagaCreator: SagaWithApolloClient, actionType: ActionType, queueSize = 10) => (
    apolloClient: ApolloClient<NormalizedCacheObject>
): Saga =>
    function*(): SagaReturnType {
        const requestChannel = yield actionChannel(actionType, buffers.expanding(queueSize));
        while (true) {
            yield call(sagaCreator(apolloClient), yield take(requestChannel));
        }
    };
