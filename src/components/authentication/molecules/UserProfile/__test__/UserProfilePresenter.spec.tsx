import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('antd', () => ({ Button: 'Button', Row: 'Row', Col: 'Col', Card: 'Card' }));
jest.mock('../../../atoms/LoadingIndicator/LoadingIndicator', () => 'LoadingIndicator');
jest.mock('../../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter', () => 'LoadingOrErrorPresenter');
import UserProfilePresenter from '../UserProfilePresenter';
import { QueryCurrentUser_currentUser } from '../graphql/__generated__/QueryCurrentUser';

const mockData: QueryCurrentUser_currentUser = {
    __typename: 'UserDTO',
    activated: true,
    createdBy: 'Test',
    createdDate: '2019-05-27T10:53:29.944312Z',
    email: 'test@mediamarktsaturn.com',
    firstName: 'Test',
    id: 49051,
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

describe('UserProfilePresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<UserProfilePresenter currentUser={mockData} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
