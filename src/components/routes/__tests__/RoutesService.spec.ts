// services
import { routesService } from '../components/RoutesService';

describe('routesService.checkAdminRole', () => {
    it('should return true if user has DP_GOD role', () => {
        expect(routesService.checkAdminRole({ roles: [{ name: 'DP_GOD' }] })).toBeTruthy();
    });

    it('should return false if user does not have  DP_GOD role', () => {
        expect(routesService.checkAdminRole({ roles: [{ name: 'UI' }] })).toBeFalsy();
    });
});
