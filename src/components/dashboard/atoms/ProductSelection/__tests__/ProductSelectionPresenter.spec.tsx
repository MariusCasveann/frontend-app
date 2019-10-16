import * as React from 'react';
import renderer from 'react-test-renderer';
jest.doMock('antd', () => ({ Select: 'Select', Option: 'Option' }));
import ProductSelectionPresenter from '../ProductSelectionPresenter';
import { QueryAllProducts_allProducts } from '../graphql/__generated__/QueryAllProducts';
import { mockSelectedProduct, mockFunction } from '../../../../common/mock/MockData';

const mockData: QueryAllProducts_allProducts[] = [
    { id: 50051, logo: null, name: 'a', __typename: 'LightProductDTO' },
    { id: 50051, logo: null, name: 'aaa-test', __typename: 'LightProductDTO' }
];

describe('ProductSelectionPresenter', () => {
    it('renders correctly with mock data', () => {
        const tree = renderer
            .create(
                <ProductSelectionPresenter
                    onProductSelected={mockFunction}
                    error={undefined}
                    loading={false}
                    selectedProduct={mockSelectedProduct}
                    data={mockData}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders correctly without mock data', () => {
        const tree = renderer
            .create(
                <ProductSelectionPresenter
                    onProductSelected={mockFunction}
                    error={undefined}
                    loading={true}
                    data={undefined}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders with error', () => {
        const tree = renderer
            .create(
                <ProductSelectionPresenter
                    onProductSelected={mockFunction}
                    error={'Error'}
                    loading={false}
                    data={undefined}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
