import { QueryCurrentUser_currentUser } from '../../components/authentication/molecules/UserProfile/graphql/__generated__/QueryCurrentUser';

/**
 * Authentication state
 */
export interface AuthenticationState {
    currentUser: QueryCurrentUser_currentUser;
}

/**
 * Authentication initial state
 */
export const initialState: AuthenticationState = {
    currentUser: {
        __typename: 'UserDTO',
        activated: false,
        createdBy: null,
        createdDate: null,
        email: null,
        firstName: null,
        id: null,
        imageContent: null,
        langKey: null,
        lastModifiedBy: null,
        lastModifiedDate: null,
        lastName: null,
        login: null,
        roles: null,
        staticPictureId: null,
        subscribedToNewsletter: null
    }
};
