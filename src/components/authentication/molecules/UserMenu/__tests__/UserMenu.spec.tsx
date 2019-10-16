import { mapStateToProps } from './../UserMenu';
import { mockCurrentUser, currentUserMockedState } from './../../../../common/mock/MockData';

describe('mapStateToProps', () => {
    it('should map state to props correctly', () => {
        const expectedResult = JSON.stringify({
            currentUser: mockCurrentUser
        });
        const result = JSON.stringify(mapStateToProps(currentUserMockedState()));
        expect(result).toEqual(expectedResult);
    });
});
