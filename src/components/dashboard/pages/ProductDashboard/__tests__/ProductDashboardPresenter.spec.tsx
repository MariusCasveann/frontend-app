import * as React from 'react';
jest.mock('../../../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card', CardLayout: 'CardLayout' }));
jest.mock(
    '../../../molecules/AccumulatedProductCost/AccumulatedProductCostPresenter',
    () => 'AccumulatedProductCostPresenter'
);
jest.mock(
    '../../../molecules/DeploymentFrequencyPerProduct/DeploymentFrequencyPerProductPresenter',
    () => 'DeploymentFrequencyPerProductPresenter'
);
jest.mock('../../../molecules/CostPerProduct/CostPerProductPresenter', () => 'CostPerProductPresenter');
jest.mock('../../../molecules/CpuUtilization/CpuUtilizationPresenter', () => 'CpuUtilizationPresenter');
jest.mock('../ProductFiltersPresenter', () => ({ ProductFiltersPresenter: 'ProductFiltersPresenter' }));

import ProductDashboardPresenter from '../ProductDashboardPresenter';
import renderer from 'react-test-renderer';

describe(' ProductDashboardPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<ProductDashboardPresenter />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
