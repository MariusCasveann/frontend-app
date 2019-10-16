// services
import { checkUserPermissions, shouldRenderNavItem } from '../../helpers/routesHelper';
import { QueryCurrentUser_currentUser } from '../../../authentication/molecules/UserProfile/graphql/__generated__/QueryCurrentUser';
import { PermissionTypeEnum, SecuredEntityTypeEnum } from '../../../../model/__generated__/globalTypes';
import { QueryAllProducts_allProducts } from '../../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { mockSelectedProduct } from '../../../common/mock/MockData';

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
                    entityType: SecuredEntityTypeEnum.APPLICATION,
                    permissionType: PermissionTypeEnum.WRITE,
                    entityId: 'aaaa'
                },
                {
                    id: 'a2',
                    __typename: 'EntityPermission',
                    entityType: SecuredEntityTypeEnum.PRODUCT,
                    entityId: 'aaaa-9',
                    permissionType: PermissionTypeEnum.READ
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
                    __typename: 'EntityPermission',
                    permissionType: PermissionTypeEnum.WRITE,
                    id: 'a1',
                    entityType: SecuredEntityTypeEnum.APPLICATION,
                    entityId: 'aaaa'
                },
                {
                    id: 'a2',
                    __typename: 'EntityPermission',
                    entityType: SecuredEntityTypeEnum.APPLICATION,
                    entityId: 'aaaa-9',
                    permissionType: PermissionTypeEnum.WRITE
                }
            ]
        }
    ]
};

const userWithNoPermissions: QueryCurrentUser_currentUser = {
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
            concretePermissions: []
        }
    ]
};

const userWithNoRole: QueryCurrentUser_currentUser = {
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
    roles: []
};

const userEmpty: QueryCurrentUser_currentUser = {
    __typename: 'UserDTO',
    activated: false,
    createdBy: null,
    createdDate: null,
    email: null,
    firstName: null,
    id: 49051,
    imageContent: null,
    langKey: null,
    lastModifiedBy: null,
    lastModifiedDate: null,
    lastName: null,
    login: null,
    staticPictureId: null,
    subscribedToNewsletter: true,
    roles: []
};

const mockNavItem = {
    children: [
        {
            icon: 'bundle',
            label: 'Deployment stages',
            navLink: '/admin/deployment-stages'
        },
        {
            icon: 'bundle',
            label: 'External tools',
            navLink: '/admin/external-tools'
        }
    ],
    icon: 'info',
    label: 'Super Admin Page',
    navLink: '/test'
};

const mockNavItemNoSelectedProduct = {
    children: [
        {
            icon: 'bundle',
            label: 'Deployment stages',
            navLink: '/admin/deployment-stages'
        },
        {
            icon: 'bundle',
            label: 'External tools',
            navLink: '/admin/external-tools'
        }
    ],
    icon: 'info',
    label: 'Super Admin Page',
    navLink: '/test',
    checkProductWasSelected: false
};

const mockNavItemSelectedProduct = {
    children: [
        {
            icon: 'bundle',
            label: 'Deployment stages',
            navLink: '/admin/deployment-stages'
        },
        {
            icon: 'bundle',
            label: 'External tools',
            navLink: '/admin/external-tools'
        }
    ],
    icon: 'info',
    label: 'Super Admin Page',
    navLink: '/test',
    checkProductWasSelected: true
};

const mockEmptyProduct: QueryAllProducts_allProducts = {
    id: null,
    logo: null,
    name: null,
    __typename: 'LightProductDTO'
};

const mockSelectedProductAll: QueryAllProducts_allProducts = {
    id: 'ALL',
    logo: 'ALL',
    name: 'All Products',
    __typename: 'LightProductDTO'
};

const mockAllowedRoles = [
    {
        allowedRoles: ['DP God', 'NETWORK_READ'],
        path: '/admin/deployment-stages'
    },
    {
        allowedRoles: ['DP God'],
        path: '/test'
    }
];

describe('checkUserPermissions', () => {
    it('should return true if user has PRODUCT READ permission', () => {
        expect(checkUserPermissions(user, 'PRODUCT', 'READ')).toBeTruthy();
    });

    it('should return true if user has no APPLICATION READ permission', () => {
        expect(checkUserPermissions(user, 'APPLICATION', 'READ')).toBeFalsy();
    });

    it('should return false if user is empty', () => {
        expect(checkUserPermissions(userEmpty, 'APPLICATION', 'READ')).toBeFalsy();
    });

    it('should return false if user has no roles', () => {
        expect(checkUserPermissions(userWithNoRole, 'APPLICATION', 'READ')).toBeFalsy();
    });

    it('should return false if user has no permissions', () => {
        expect(checkUserPermissions(userWithNoPermissions, 'APPLICATION', 'READ')).toBeFalsy();
    });
});

describe('shouldRenderNavItem', () => {
    it('should return false if there are no allowedValues', () => {
        expect(shouldRenderNavItem(mockNavItem, [], mockSelectedProductAll)).toBeFalsy();
    });

    it('should return false if there is no navigationItem.navLink', () => {
        expect(shouldRenderNavItem(mockNavItemNoSelectedProduct, [], mockEmptyProduct)).toBeFalsy();
    });

    it('should return true if there the navigationItem.pathLink is found in the allowed routes ', () => {
        expect(shouldRenderNavItem(mockNavItemNoSelectedProduct, mockAllowedRoles, mockEmptyProduct)).toBeTruthy();
    });

    it('should return true if pathLink was found but checkProductWasSelected is false  ', () => {
        expect(shouldRenderNavItem(mockNavItemNoSelectedProduct, mockAllowedRoles, mockEmptyProduct)).toBeTruthy();
    });

    it('should return true if path was found and selectedProduct.id !== ALL', () => {
        expect(shouldRenderNavItem(mockNavItemSelectedProduct, mockAllowedRoles, mockSelectedProduct)).toBeTruthy();
    });
});
