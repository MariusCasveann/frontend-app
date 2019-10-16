import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RoutesPresenter from '../components/RoutesPresenter';
import { QueryCurrentUser_currentUser } from '../../authentication/molecules/UserProfile/graphql/__generated__/QueryCurrentUser';
import { mockSelectedProduct } from '../../common/mock/MockData';

jest.mock('../components/RoutesConstants', () => ({
    routes: [
        {
            allowedRoles: [],
            checkAdminRole: true,
            component: () => <div>jj</div>,
            path: '/dashboard'
        }
    ]
}));

const user: QueryCurrentUser_currentUser = {
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
    staticPictureId: null,
    subscribedToNewsletter: true,
    roles: [
        {
            __typename: 'Role',
            id: 'test',
            name: 'aa',
            readOnly: false,
            concretePermissions: [
                {
                    id: 'a1',
                    __typename: 'EntityPermission',
                    entityType: 'APPLICATION',
                    permissionType: 'WRITE',
                    entityId: 'aaaa'
                },
                {
                    id: 'a2',
                    __typename: 'EntityPermission',
                    entityType: 'PRODUCT',
                    entityId: 'aaaa-9',
                    permissionType: 'READ'
                }
            ]
        },
        {
            __typename: 'Role',
            id: 'test',
            name: 'aa',
            readOnly: false,
            concretePermissions: [
                {
                    id: 'a1',
                    __typename: 'EntityPermission',
                    entityType: 'APPLICATION',
                    permissionType: 'WRITE',
                    entityId: 'aaaa'
                },
                {
                    id: 'a2',
                    __typename: 'EntityPermission',
                    entityType: 'APPLICATION',
                    entityId: 'aaaa-9',
                    permissionType: 'WRITE'
                }
            ]
        }
    ]
};

// tslint:disable-next-line:no-any
const _ShallowRenderer: any = ShallowRenderer;
const renderer = new _ShallowRenderer();

describe('RoutesPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.render(<RoutesPresenter selectedProduct={mockSelectedProduct} currentUser={user} />);
        expect(tree).toMatchSnapshot();
    });
});
