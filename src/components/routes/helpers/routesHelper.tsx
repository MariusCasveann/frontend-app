// interfaces
import { QueryCurrentUser_currentUser } from '../../authentication/molecules/UserProfile/graphql/__generated__/QueryCurrentUser';
import { ALWAYS, Navigation, RouteI, routes, WRITE } from '../components/RoutesConstants';
import { QueryAllProducts_allProducts } from '../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';

// constants
import { ALL } from '../../../utils/constants';
import { DP_GOD, SERVICE_SECTION } from '../../../config/constants';

/**
 *  Check if user has a specific permission type on an entityType(product, application)
 *
 */

export const checkUserPermissions = (user: QueryCurrentUser_currentUser, entityType: string, permissionType: string) =>
    Boolean(
        user &&
            user.roles &&
            user.roles.find(role =>
                Boolean(
                    role &&
                        role.concretePermissions &&
                        role.concretePermissions.find(item =>
                            Boolean(item && item.entityType === entityType && item.permissionType === permissionType)
                        )
                )
            )
    );

/*
 *
 * Check if should render a navigation item based on user roles
 */
export const shouldRenderNavItem = (
    navigationItem: Navigation,
    allowedRoutes: RouteI[],
    selectedProduct: QueryAllProducts_allProducts
) =>
    allowedRoutes &&
    navigationItem &&
    (allowedRoutes.find((route: RouteI) => Boolean(route.path === navigationItem.navLink)) ||
        (navigationItem.children &&
            navigationItem.children.find(item =>
                Boolean(allowedRoutes.find(i => Boolean(i.path === item.navLink)))
            ))) &&
    (!navigationItem.checkProductWasSelected || (selectedProduct && selectedProduct.id! !== ALL));

export const prepareRoutes = (currentUser: QueryCurrentUser_currentUser) => {
    const allowedRoutes: RouteI[] = [];

    if (currentUser && currentUser.roles && currentUser.roles.find(item => Boolean(item && item.name === DP_GOD))) {
        return routes;
    }

    routes.forEach((route: RouteI) => {
        const always: boolean = route.allowedRoles && route.allowedRoles.includes(ALWAYS);

        const allowedRoute =
            route.allowedRoles &&
            route.allowedRoles.find(item =>
                Boolean(currentUser.roles && currentUser.roles.find(i => Boolean(i && i.name === item)))
            );

        const { roles } = currentUser;
        let allowedRouteByPermission = Boolean(
            roles &&
                roles.find(role =>
                    Boolean(
                        role &&
                            role.concretePermissions &&
                            role.concretePermissions.find(item =>
                                Boolean(
                                    item &&
                                        route.allowedRoles.find((allowedRole: string) =>
                                            Boolean(item.permissionType === allowedRole)
                                        )
                                )
                            )
                    )
                )
        );

        if (route.checkServiceSectionPermission && allowedRouteByPermission) {
            allowedRouteByPermission = checkUserPermissions(currentUser, SERVICE_SECTION, WRITE);
        }

        if (allowedRoute || always || allowedRouteByPermission) {
            allowedRoutes.push(route);
        }
    });

    return allowedRoutes;
};
