import { call, put } from 'redux-saga/effects';
import { AuthenticationActionTypes, AuthenticationActionCreators } from './../authentication/AuthenticationActions';
import { createSagaRegistration, SagaWithApolloClient } from '../../utils/redux/SagaUtils';
import { loader } from 'graphql.macro';

export const queryCurrentUser = loader(
    '../../components/authentication/molecules/UserProfile/graphql/QueryCurrentUser.graphql'
);

export function* handleLogout() {
    localStorage.clear();
    sessionStorage.clear();
    yield (window.location.href = '/');
}

export const getCurrentUser: SagaWithApolloClient = client =>
    function*() {
        try {
            const response = yield call(client.query, {
                query: queryCurrentUser,
                fetchPolicy: 'network-only'
            });
            if (!response.error) {
                yield put(AuthenticationActionCreators.loginSuccessful({ currentUser: response.data.currentUser }));
            }
        } catch (error) {
            console.log(error);
        }
    };

export default [
    createSagaRegistration(getCurrentUser, AuthenticationActionTypes.login),
    createSagaRegistration(() => handleLogout, AuthenticationActionTypes.logout)
];
