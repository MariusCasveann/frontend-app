import { ALL, ENGINEERING_PLATFORM, API_MANAGEMENT } from '../constants';

describe('constants', () => {
    it('All should have the expected value', () => {
        expect(ALL).toEqual('ALL');
    });

    it('ENGINEERING_PLATFORM should have the expected value', () => {
        expect(ENGINEERING_PLATFORM).toEqual('Engineering Platform');
    });

    it('API_MANAGEMENT should have the expected value', () => {
        expect(API_MANAGEMENT).toEqual('api-management');
    });
});
