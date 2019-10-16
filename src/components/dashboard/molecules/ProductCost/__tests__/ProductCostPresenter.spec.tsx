import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('./../ProductCostWidget', () => 'ProductCostWidget');
jest.mock('../../../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card' }));
import ProductCostPresenter from '../ProductCostPresenter';
import { mockSelectedDomain } from '../../../../common/mock/MockData';

describe('ProductCostPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<ProductCostPresenter selectedDomain={mockSelectedDomain} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
