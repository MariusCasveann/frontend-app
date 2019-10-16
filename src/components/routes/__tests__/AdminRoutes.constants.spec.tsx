import {
    ADMIN_EXTERNAL_TOOLS_ROUTE,
    BUSINESS_DOMAIN_ROUTE,
    DEPLOYMENT_STAGE_ROUTE,
    GOOGLE_FOLDER_ROUTE
} from '../components/adminRoutes.constants';

const expectedValues = {
    [DEPLOYMENT_STAGE_ROUTE]: '/admin/deployment-stages',
    [ADMIN_EXTERNAL_TOOLS_ROUTE]: '/admin/external-tools',
    [BUSINESS_DOMAIN_ROUTE]: '/admin/business-domain',
    [GOOGLE_FOLDER_ROUTE]: '/admin/google-folders'
};

describe('DEPLOYMENT_STAGE_ROUTE', () => {
    it('should have the right value', () => {
        expect(DEPLOYMENT_STAGE_ROUTE).toEqual(expectedValues[DEPLOYMENT_STAGE_ROUTE]);
    });
});

describe('ADMIN_EXTERNAL_TOOLS_ROUTE', () => {
    it('should have the right value', () => {
        expect(ADMIN_EXTERNAL_TOOLS_ROUTE).toEqual(expectedValues[ADMIN_EXTERNAL_TOOLS_ROUTE]);
    });
});

describe('BUSINESS_DOMAIN_ROUTE', () => {
    it('should have the right value', () => {
        expect(BUSINESS_DOMAIN_ROUTE).toEqual(expectedValues[BUSINESS_DOMAIN_ROUTE]);
    });
});

describe('GOOGLE_FOLDER_ROUTE', () => {
    it('should have the right value', () => {
        expect(GOOGLE_FOLDER_ROUTE).toEqual(expectedValues[GOOGLE_FOLDER_ROUTE]);
    });
});
