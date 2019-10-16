import { GraphQLError } from 'graphql';
import { QueryAllProducts_allProducts } from './../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { QueryAllDomains_allDomains } from './../../dashboard/atoms/DomainSelection/graphql/__generated__/QueryAllDomains';
import { LightApplicationsOfProduct_lightApplicationsOfProduct } from './../../applications/graphql/__generated__/LightApplicationsOfProduct';
import { QueryBilling_billingQuery } from '../../dashboard/molecules/common/qraphql/__generated__/QueryBilling';
import {
    TeamByProductId_teamByProductId,
    TeamByProductId_teamByProductId_teamMembers
} from '../../teams/molecules/TeamMembers/graphql/__generated__/TeamByProductId';
import {
    QueryCurrentUser_currentUser,
    QueryCurrentUser_currentUser_roles
} from '../../authentication/molecules/UserProfile/graphql/__generated__/QueryCurrentUser';
import { SelectItemProps } from '../molecules/SearchableSelect/SearchableSelectPresenter';

export const mockGraphQLError: GraphQLError = {
    message: 'FATALITY',
    name: 'error',
    locations: undefined,
    path: undefined,
    nodes: undefined,
    positions: undefined,
    source: undefined,
    originalError: undefined,
    extensions: undefined
};

export const mockSelectedDomain: QueryAllDomains_allDomains = {
    id: 102,
    name: 'Engineering Platform',
    __typename: 'Domain'
};

export const mockSelectedProduct: QueryAllProducts_allProducts = {
    id: 50051,
    logo: null,
    name: 'a',
    __typename: 'LightProductDTO'
};

export const mockedApplications: LightApplicationsOfProduct_lightApplicationsOfProduct[] = [
    {
        id: 50051,
        staticPictureId: null,
        name: 'a',
        service: false,
        __typename: 'LightApplicationDTO'
    }
];

export const mockFunction = jest.fn();

export const mockDataEmpty: QueryBilling_billingQuery[] = [];

// tslint:disable-next-line:no-any
export const createMockedState = (loginAsProps?: Partial<{ data: any; loading: boolean; error: undefined }>): any => ({
    app: {
        authentication: {
            loginAs: {
                error: undefined,
                ...loginAsProps
            }
        },
        products: {
            selectedProduct: mockSelectedProduct
        }
    }
});

export const userProductMockedState = () => ({
    app: {
        authentication: {
            currentUser: mockCurrentUser
        },
        products: {
            selectedProduct: mockSelectedProduct
        }
    }
});

export const preSelectedProduct: QueryAllProducts_allProducts = {
    __typename: 'LightProductDTO',
    id: 'ALL',
    logo: 'ALL',
    name: 'All Products'
};

export const currentUserMockedState = () => ({
    app: {
        authentication: {
            currentUser: mockCurrentUser
        },
        products: {
            selectedProduct: preSelectedProduct
        }
    }
});

export const selectedProductMockedState = (
    loginAsProps?: Partial<{ data: any; loading: boolean; error: undefined }>
): any => ({
    app: {
        authentication: {
            loginAs: {
                error: undefined,
                ...loginAsProps
            }
        },
        products: {
            selectedProduct: mockSelectedProduct
        }
    }
});

export const buildDataExpectedEmptyResults = {
    labels: [],
    datasets: [
        {
            data: []
        }
    ]
};

export const mockErrorMessage = 'Error message';

export const mockTeamMember: TeamByProductId_teamByProductId_teamMembers = {
    __typename: 'User',
    email: 'test@mediamarktsaturn.com',
    firstName: 'Test',
    lastName: 'Test',
    id: '11',
    roles: [
        {
            name: 'WRITE_ALL',
            __typename: 'Role'
        },
        {
            name: 'a-admin',
            __typename: 'Role'
        }
    ]
};

export const mockTeamByProductId: TeamByProductId_teamByProductId = {
    __typename: 'Team',
    id: 2355,
    productOwner: {
        id: 11,
        firstName: 'TestUser',
        lastName: 'Test',
        __typename: 'User'
    },
    teamMembers: [
        {
            __typename: 'User',
            email: 'test1@mediamarktsaturn.com',
            firstName: 'Test',
            id: '1234',
            lastName: 'Test2',
            roles: [
                {
                    name: 'WRITE_ALL',
                    __typename: 'Role'
                },
                {
                    name: 'a-admin',
                    __typename: 'Role'
                }
            ]
        },
        {
            __typename: 'User',
            email: 'test2@mediamarktsaturn.com',
            firstName: 'Test2',
            id: '2234',
            lastName: 'Test2',
            roles: [
                {
                    name: 'WRITE_ALL',
                    __typename: 'Role'
                },
                {
                    name: 'a-admin',
                    __typename: 'Role'
                },
                {
                    name: 'test-admin',
                    __typename: 'Role'
                }
            ]
        }
    ]
};

export const mockCurrentUser: QueryCurrentUser_currentUser = {
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
    roles: [
        {
            concretePermissions: [],
            id: 1300,
            name: 'DP God',
            readOnly: true,
            __typename: 'Role'
        },
        {
            concretePermissions: [],
            id: 4651,
            name: 'READ_ALL',
            readOnly: false,
            __typename: 'Role'
        },
        {
            concretePermissions: [],
            id: 69002,
            name: 'a-read',
            readOnly: true,
            __typename: 'Role'
        }
    ],
    staticPictureId: null,
    subscribedToNewsletter: true
};

export const mockEmptyTeam: TeamByProductId_teamByProductId = {
    __typename: 'Team',
    id: null,
    productOwner: null,
    teamMembers: []
};

export const mockCurrenUserRole: QueryCurrentUser_currentUser_roles = {
    concretePermissions: [],
    id: 1300,
    name: 'DP God',
    readOnly: true,
    __typename: 'Role'
};

export const mockForm = {
    getFieldDecorator: () => () => false,
    getFieldError: mockFunction,
    getFieldsError: mockFunction,
    getFieldsValue: mockFunction,
    getFieldValue: mockFunction,
    isFieldValidating: mockFunction,
    setFields: mockFunction,
    setFieldsValue: mockFunction,
    validateFields: mockFunction,
    validateFieldsAndScroll: mockFunction,
    isFieldsTouched: mockFunction,
    isFieldTouched: mockFunction,
    resetFields: mockFunction
};

export const mockHistory = {
    length: 7,
    push: mockFunction,
    action: 'PUSH',
    location: {
        hash: '',
        pathname: '/path',
        search: '',
        state: {}
    },
    replace: mockFunction,
    go: mockFunction,
    goBack: mockFunction,
    goForward: mockFunction,
    block: mockFunction,
    createHref: mockFunction,
    listen: mockFunction
};

export const mockSelectData: SelectItemProps[] = [
    {
        id: '351952',
        label: 'Test test'
    },
    {
        id: '80503',
        label: 'Test1 test1'
    },
    {
        id: '412605',
        label: 'Test2 test2'
    }
];
