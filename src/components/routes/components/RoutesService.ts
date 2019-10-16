import { UserDTO, EntityPermission, LightProductDTO } from '../../../services/api.generated/dp-backend/index';

// constants
import { DP_GOD, FOLDER, SERVICE_SECTION, WRITE } from '../../../config/constants';

class RoutesService {
    public checkAdminRole = (user: UserDTO) =>
        Boolean(user && user.roles && user.roles.find(item => item.name === DP_GOD));

    // this code is unused yet because we don't have in the entityType enum the FOLDER type for the EntityPermission

    // public checkIfUserHasServiceSectionPermission = (permissions: EntityPermission[]) =>
    //     Boolean(permissions && permissions.find((item: EntityPermission) => item.entityType === SERVICE_SECTION && item.permissionType === WRITE));
    //
    // public checkIfUserHasProductExternalToolsPermission = (selectedProduct: LightProductDTO, permissions: EntityPermission[], user: UserDTO) =>
    //
    //     Boolean(permissions &&
    //         permissions.find(item => item.entityId === selectedProduct.id && item.permissionType === WRITE) ||
    //     (user && user.roles && user.roles.find(role => role.name === DP_GOD)));
    //
    // public checkIfUserHasFoundationPermission = (permissions) =>
    //     Boolean(
    //         permissions &&
    //         permissions.find((item) => item.entityType === FOLDER && item.permissionType === WRITE)
    //     );
}

export const routesService = new RoutesService();
