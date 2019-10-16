import { Action } from 'redux';
import { QueryCurrentUser_currentUser } from '../../components/authentication/molecules/UserProfile/graphql/__generated__/QueryCurrentUser';

export enum AuthenticationActionTypes {
    logout = 'LOGOUT',
    login = 'LOGIN',
    loginSuccessful = 'LOGIN_SUCCESSFUL'
}

export interface LogoutAction extends Action<AuthenticationActionTypes.logout> {}
export interface LoginAction extends Action<AuthenticationActionTypes.login> {}
export interface LoginSuccessfulAction extends Action<AuthenticationActionTypes.loginSuccessful> {
    payload: {
        currentUser: QueryCurrentUser_currentUser;
    };
}

export const AuthenticationActionCreators = {
    logout: (): LogoutAction => ({
        type: AuthenticationActionTypes.logout
    }),
    login: (): LoginAction => ({
        type: AuthenticationActionTypes.login
    }),
    loginSuccessful: (payload: LoginSuccessfulAction['payload']): LoginSuccessfulAction => ({
        type: AuthenticationActionTypes.loginSuccessful,
        payload
    })
};
