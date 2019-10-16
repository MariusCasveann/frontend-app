import { mapStateToProps } from '../LightApplications';
import { mockSelectedProduct, selectedProductMockedState } from '../../common/mock/MockData';

describe('mapStateToProps', () => {
    it('should map state to props correctly', () => {
        const expectedResult = JSON.stringify({
            selectedProduct: mockSelectedProduct
        });
        const result = JSON.stringify(mapStateToProps(selectedProductMockedState()));
        expect(result).toEqual(expectedResult);
    });
});
