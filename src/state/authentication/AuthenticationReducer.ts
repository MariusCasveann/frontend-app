import { Reducer } from 'redux';
import { AuthenticationActionTypes } from './AuthenticationActions';
import { AuthenticationState, initialState } from './AuthenticationState';

export const AuthenticationReducer: Reducer<AuthenticationState> = (state = initialState, action) => {
    switch (action.type) {
        case AuthenticationActionTypes.logout: {
            return {
                ...state,
                currentUser: undefined
            };
        }
        case AuthenticationActionTypes.loginSuccessful: {
            return {
                ...state,
                currentUser: action.payload.currentUser
            };
        }
        default:
            return state;
    }
};
