import { getProductId } from './../productHelper';
import { mockSelectedProduct } from '../../../common/mock/MockData';

describe('Product helper', () => {
    it('check if productId will be returned', () => {
        const productId = expect(getProductId(mockSelectedProduct));
        productId.toBe(50051);
    });
});
