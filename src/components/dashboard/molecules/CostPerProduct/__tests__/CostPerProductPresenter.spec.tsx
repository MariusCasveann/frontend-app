import ShallowRenderer from 'react-test-renderer/shallow';
import * as React from 'react';
import { mockSelectedProduct } from '../../../../common/mock/MockData';
jest.doMock('../../../atoms/Filters/FiltersContext', () => ({
    FiltersContext: 'FiltersContext',
    'FiltersContext.Consumer': 'FiltersContext.Consumer'
}));
jest.mock('../../../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card' }));
jest.mock('./../CostPerProductWidget', () => 'CostPerProductWidget');
import CostPerProductPresenter from './../CostPerProductPresenter';

// tslint:disable-next-line:no-any
const _ShallowRenderer: any = ShallowRenderer;
const renderer = new _ShallowRenderer();

const tree = renderer.render(<CostPerProductPresenter selectedProduct={mockSelectedProduct} />);
describe('CostPerProductPresenter', () => {
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });
});
