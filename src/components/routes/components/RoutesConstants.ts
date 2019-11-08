// components
import UserProfile from '../../authentication/molecules/UserProfile/UserProfile';
import { ComponentClass, FunctionComponent } from 'react';
import PageNotFound from '../atoms/PageNotFound';
import { NewDashboard } from '../../dashboard/newDashboard/NewDashboard';
import { EditUserPage } from '../../dashboard/newDashboard/components/EditUserPage';
import { ChatApplication } from '../../dashboard/newDashboard/chatApp/components/ChatApplication';

// constants
import {
    ADMIN_EXTERNAL_TOOLS_ROUTE,
    BUSINESS_DOMAIN_ROUTE,
    DEPLOYMENT_STAGE_ROUTE,
    GOOGLE_FOLDER_ROUTE,
    NETWORK_READ,
    SERVICE_SECTION_ROUTE
} from './adminRoutes.constants';
import DashboardTabsPresenter from '../../dashboard/pages/DashboardTabs/DashboardTabsPresenter';
import LightApplications from '../../applications/LightApplications';
import CreateTeam from '../../createTeam/CreateTeam';
import Team from '../../teams/molecules/TeamMembers/Team';

const DP_GOD = 'DP God';

export const ALWAYS = 'ALWAYS';

const READ = 'READ';

export const WRITE = 'WRITE';

export const SERVICE_SECTION = 'SERVICE_SECTION';

const CLOUD_FOUNDATION_PLATFORM = 'cloud-foundation-platform';

export const adminRoles = [DP_GOD];

const ALLOWED_ROUTES_FOR_PRODUCT: string[] = [...adminRoles, READ, WRITE];

// paths
const DASHBOARD_PATH = '/dashboard';
const USER_EDIT_PATH = '/user-edit';
const APPLICATIONS_PATH = '/applications';
const BILLING_PATH = '/billing';
const APPLICATION_EDIT_PATH = '/edit-application/:id';
const PRODUCT_EDIT_PATH = '/edit-product/:id';
const BUILD_DETAILS_PATH = '/build-details';
const BUILDS_PATH = '/application/:id';
const LOGIN_PATH = '/login';
const NEW_APPLICATION_PATH = '/new-application';
const REGISTER_PATH = '/register';
const RESET_PASSWORD_PATH = '/reset-password/:id';
const ROLES_PATH = '/roles';
const ROLE_PATH = '/role/:id';
const SERVICE_CATALOGUE_PATH = '/service-catalogue';
const DOMAIN_PATH = '/domain';
const SERVICE_DETAILS_PATH = '/service-details/:id';
const NEW_PRODUCT_PATH = '/new-product';
const PRIVACY_PATH = '/privacy';
const TEAM_PATH = '/team';
const CREATE_TEAM_PATH = '/create-team';
const USERS_PATH = '/users';
const PRODUCT_DETAILS_PATH = '/product-details';
const SERVICE_SECTION_PATH = '/service-section';
const EXTERNAL_TOOLS_PATH = '/external-tools';
const NEW_DASHBOARD_PATH = '/new-dashboard';
const EDIT_USER_PATH = '/new-dashboard/edit-user/:name'; // :title  - marchez o valoare dinamica
const CHAT_APP = '/chat-app';

export interface RouteI {
    allowedRoles: string[];
    title?: string;
    path: string;
    name?: string;
    component?: ComponentClass | FunctionComponent;
    checkFoundation?: boolean;
    checkServiceSectionPermission?: boolean;
    checkAdminRole?: boolean;
}

export interface Navigation {
    icon?: string;
    label?: string;
    children?: Navigation[];
    navLink: string;
    checkProductWasSelected?: boolean;
}

const adminRoutes: RouteI[] = [
    {
        allowedRoles: [...adminRoles, NETWORK_READ],
        checkAdminRole: true,
        component: PageNotFound,
        path: DEPLOYMENT_STAGE_ROUTE
    },
    {
        allowedRoles: adminRoles,
        checkAdminRole: true,
        component: PageNotFound,
        path: ADMIN_EXTERNAL_TOOLS_ROUTE
    },
    {
        allowedRoles: adminRoles,
        checkAdminRole: true,
        component: PageNotFound,
        path: GOOGLE_FOLDER_ROUTE
    },
    {
        allowedRoles: adminRoles,
        checkAdminRole: true,
        component: PageNotFound,
        path: SERVICE_SECTION_ROUTE
    },
    {
        allowedRoles: adminRoles,
        checkAdminRole: true,
        component: PageNotFound,
        path: BUSINESS_DOMAIN_ROUTE
    }
];

export const routes: RouteI[] = [
    ...adminRoutes,
    {
        allowedRoles: [DP_GOD],
        checkAdminRole: true,
        component: DashboardTabsPresenter,
        path: DASHBOARD_PATH
    },
    {
        allowedRoles: [ALWAYS],
        checkAdminRole: true,
        component: UserProfile,
        path: USER_EDIT_PATH
    },
    {
        allowedRoles: ALLOWED_ROUTES_FOR_PRODUCT,
        title: 'Applications',
        path: APPLICATIONS_PATH,
        checkFoundation: true,
        component: LightApplications
    },
    {
        allowedRoles: [...ALLOWED_ROUTES_FOR_PRODUCT, CLOUD_FOUNDATION_PLATFORM],
        title: 'Billing',
        path: BILLING_PATH,
        checkFoundation: true,
        component: PageNotFound
    },
    {
        allowedRoles: ALLOWED_ROUTES_FOR_PRODUCT,
        title: 'Edit Application',
        path: APPLICATION_EDIT_PATH,
        checkFoundation: true,
        component: PageNotFound
    },
    {
        allowedRoles: ALLOWED_ROUTES_FOR_PRODUCT,
        title: 'Edit Product',
        path: PRODUCT_EDIT_PATH,
        component: PageNotFound
    },
    {
        allowedRoles: ALLOWED_ROUTES_FOR_PRODUCT,
        title: 'Build-Details',
        path: BUILD_DETAILS_PATH,
        checkFoundation: true,
        component: PageNotFound
    },
    {
        allowedRoles: ALLOWED_ROUTES_FOR_PRODUCT,
        title: 'Builds',
        path: BUILDS_PATH,
        checkFoundation: true,
        component: PageNotFound
    },
    {
        allowedRoles: [ALWAYS],
        title: 'Login',
        path: LOGIN_PATH,
        component: PageNotFound
    },
    {
        allowedRoles: ALLOWED_ROUTES_FOR_PRODUCT,
        title: 'New Application',
        path: NEW_APPLICATION_PATH,
        checkFoundation: true,
        component: PageNotFound
    },
    {
        allowedRoles: [ALWAYS],
        title: 'Register',
        path: REGISTER_PATH,
        component: PageNotFound
    },
    {
        allowedRoles: [ALWAYS],
        title: 'Reset Password',
        path: RESET_PASSWORD_PATH,
        component: PageNotFound
    },
    {
        allowedRoles: adminRoles,
        component: PageNotFound,
        checkAdminRole: true,
        title: 'Roles',
        path: ROLES_PATH
    },
    {
        allowedRoles: adminRoles,
        component: PageNotFound,
        checkAdminRole: true,
        title: 'Role',
        path: ROLE_PATH
    },
    {
        allowedRoles: [ALWAYS],
        title: 'Service Catalogue',
        path: SERVICE_CATALOGUE_PATH,
        component: PageNotFound
    },
    {
        allowedRoles: [ALWAYS],
        title: 'Dashboard',
        path: NEW_DASHBOARD_PATH,
        component: NewDashboard
    },
    {
        allowedRoles: [ALWAYS],
        title: 'Chat application',
        path: CHAT_APP,
        component: ChatApplication
    },
    {
        allowedRoles: [ALWAYS],
        title: 'Edit user',
        path: EDIT_USER_PATH,
        component: EditUserPage
    },
    {
        allowedRoles: ALLOWED_ROUTES_FOR_PRODUCT,
        title: 'PageNotFound',
        path: DOMAIN_PATH,
        component: PageNotFound
    },
    {
        allowedRoles: [ALWAYS],
        title: 'Service Details',
        path: SERVICE_DETAILS_PATH,
        component: PageNotFound
    },
    {
        allowedRoles: ALLOWED_ROUTES_FOR_PRODUCT,
        title: 'New Product',
        path: NEW_PRODUCT_PATH,
        component: PageNotFound
    },
    {
        allowedRoles: [ALWAYS],
        title: 'Privacy Policy',
        path: PRIVACY_PATH,
        component: PageNotFound
    },
    {
        allowedRoles: ALLOWED_ROUTES_FOR_PRODUCT,
        title: 'Team',
        path: TEAM_PATH,
        component: Team
    },
    {
        allowedRoles: ALLOWED_ROUTES_FOR_PRODUCT,
        title: 'Create Team',
        path: CREATE_TEAM_PATH,
        component: CreateTeam
    },
    {
        allowedRoles: adminRoles,
        checkAdminRole: true,
        component: PageNotFound,
        path: USERS_PATH,
        title: 'Users'
    },
    {
        allowedRoles: [ALWAYS],
        title: 'Edit profile',
        path: USER_EDIT_PATH,
        component: PageNotFound
    },
    {
        allowedRoles: ALLOWED_ROUTES_FOR_PRODUCT,
        title: 'Product Details',
        path: PRODUCT_DETAILS_PATH,
        component: PageNotFound
    },
    {
        allowedRoles: [...adminRoles, WRITE],
        checkServiceSectionPermission: true,
        title: 'Service Section',
        path: SERVICE_SECTION_PATH,
        component: PageNotFound
    },
    {
        allowedRoles: [...adminRoles, WRITE],
        title: 'External Tools',
        path: EXTERNAL_TOOLS_PATH,
        component: PageNotFound
    }
];

export const navigationOptions: Navigation[] = [
    {
        icon: 'appstore',
        label: 'Dashboard',
        navLink: DASHBOARD_PATH
    },
    {
        icon: 'database',
        label: 'Applications',
        navLink: APPLICATIONS_PATH,
        checkProductWasSelected: true
    },
    {
        icon: 'credit-card',
        label: 'Billing',
        navLink: BILLING_PATH,
        checkProductWasSelected: true
    },
    {
        icon: 'control',
        label: 'Roles',
        navLink: ROLES_PATH
    },
    {
        icon: 'team',
        label: 'Team',
        navLink: TEAM_PATH,
        checkProductWasSelected: true
    },
    {
        icon: 'settings',
        label: 'External Tools',
        navLink: EXTERNAL_TOOLS_PATH,
        checkProductWasSelected: true
    },
    {
        icon: 'search',
        label: 'Product Details',
        navLink: PRODUCT_DETAILS_PATH,
        checkProductWasSelected: true
    },
    {
        icon: 'appstore',
        label: 'Service Catalogue',
        navLink: SERVICE_CATALOGUE_PATH
    },
    {
        icon: 'laptop',
        label: 'New Dashboard',
        navLink: NEW_DASHBOARD_PATH
    },
    {
        icon: 'message',
        label: 'Chat',
        navLink: CHAT_APP
    },
    {
        icon: 'appstore',
        label: 'Business Domain',
        navLink: DOMAIN_PATH
    },
    {
        icon: 'appstore',
        label: 'Service section',
        navLink: SERVICE_SECTION_PATH
    },
    {
        icon: 'info',
        label: 'Super Admin Page',
        navLink: '/admin',
        children: [
            {
                icon: 'bundle',
                label: 'Deployment stages',
                navLink: DEPLOYMENT_STAGE_ROUTE
            },
            {
                icon: 'bundle',
                label: 'External tools',
                navLink: ADMIN_EXTERNAL_TOOLS_ROUTE
            },
            {
                icon: 'bundle',
                label: 'Google Folders',
                navLink: GOOGLE_FOLDER_ROUTE
            },
            {
                icon: 'bundle',
                label: 'Business Domain',
                navLink: BUSINESS_DOMAIN_ROUTE
            }
        ]
    }
];
