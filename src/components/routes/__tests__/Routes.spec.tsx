import { mapStateToProps } from '../components/Routes';
import { mockCurrentUser, mockSelectedProduct, userProductMockedState } from '../../common/mock/MockData';

describe('mapStateToProps', () => {
    it('should map state to props correctly', () => {
        const expectedResult = JSON.stringify({
            currentUser: mockCurrentUser,
            selectedProduct: mockSelectedProduct
        });
        const result = JSON.stringify(mapStateToProps(userProductMockedState()));
        expect(result).toEqual(expectedResult);
    });
});
