import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('antd', () => ({ Button: 'Button' }));
jest.mock('backoffice-shared-components', () => ({ Flyout: 'Flyout', Icon: 'Icon' }));
jest.mock('./../../../../authentication', () => ({ LogoutButtonPresenter: 'LogoutButtonPresenter' }));
import UserMenuPresenter from '../UserMenuPresenter';
import { QueryCurrentUser_currentUser } from '../../UserProfile/graphql/__generated__/QueryCurrentUser';

const mockData: QueryCurrentUser_currentUser = {
    __typename: 'UserDTO',
    activated: true,
    createdBy: 'anonymousUser',
    createdDate: '2019-05-27T10:53:29.944312Z',
    email: 'test@mediamarktsaturn.com',
    firstName: 'Test',
    id: 49050,
    imageContent: null,
    langKey: null,
    lastModifiedBy: 'Test',
    lastModifiedDate: '2019-06-28T05:56:51.175813Z',
    lastName: 'Test',
    login: 'Test',
    roles: null,
    staticPictureId: null,
    subscribedToNewsletter: true
};

describe('UserMenuPresenter', () => {
    it.only('renders correctly', () => {
        const tree = renderer.create(<UserMenuPresenter currentUser={mockData} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
