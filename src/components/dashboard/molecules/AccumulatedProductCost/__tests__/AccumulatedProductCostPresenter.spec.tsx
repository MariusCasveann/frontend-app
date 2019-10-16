import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('../../../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card' }));
jest.mock('./../AccumulatedProductCostWidget', () => 'AccumulatedProductCostWidget');
import AccumulatedProductCostPresenter from '../AccumulatedProductCostPresenter';
import { mockSelectedProduct } from '../../../../common/mock/MockData';

describe('AccumulatedProductCostPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<AccumulatedProductCostPresenter selectedProduct={mockSelectedProduct} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
