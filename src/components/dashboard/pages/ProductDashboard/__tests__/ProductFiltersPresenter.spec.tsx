import ShallowRenderer from 'react-test-renderer/shallow';
import * as React from 'react';
import { ProductFiltersPresenter } from '../ProductFiltersPresenter';
import { mockSelectedProduct } from '../../../../common/mock/MockData';

jest.doMock('../../../../../utils/fiscalYear', () => ({
    getCurrentDate: () => '2019-01-02',
    getYesterdayDate: () => '2019-01-01'
}));

// tslint:disable-next-line:no-any
const _ShallowRenderer: any = ShallowRenderer;
const renderer = new _ShallowRenderer();

const tree = renderer.render(
    <ProductFiltersPresenter setSelectedProduct={() => false} selectedProduct={mockSelectedProduct} />
);

describe('ProductFiltersPresenter', () => {
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });
});
