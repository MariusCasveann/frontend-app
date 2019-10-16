import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('../../../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card', CardLayout: 'CardLayout' }));
jest.mock('../../../molecules/GoogleCost/GoogleCostPresenter', () => 'GoogleCostPresenter');
jest.mock('../../../molecules/DeploymentFrequency/DeploymentFrequencyPresenter', () => 'DeploymentFrequencyPresenter');
jest.mock('../../../molecules/DomainCost/DomainCostPresenter', () => 'DomainCostPresenter');
jest.mock('../GovernanceFilterPresenter', () => 'GovernanceFilterPresenter');
jest.doMock('../../../atoms/Filters/FiltersContext', () => ({
    FiltersContext: 'FiltersContext',
    'FiltersContext.Consumer': 'FiltersContext.Consumer'
}));

import GovernanceDashboardPresenter from '../GovernanceDashboardPresenter';

describe(' GovernanceDashboardPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<GovernanceDashboardPresenter />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
