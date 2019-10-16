import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('../../../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card' }));
jest.mock('./../CpuUtilizationWidget', () => 'CpuUtilizationWidget');
import CpuUtilizationPresenter from '../CpuUtilizationPresenter';
import { mockSelectedProduct } from '../../../../common/mock/MockData';

describe('CpuUtilizationPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<CpuUtilizationPresenter selectedProduct={mockSelectedProduct} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
