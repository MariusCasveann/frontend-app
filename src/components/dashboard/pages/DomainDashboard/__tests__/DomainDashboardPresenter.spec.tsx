import * as React from 'react';
jest.mock('../../../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card', CardLayout: 'CardLayout' }));
jest.mock('../../../molecules/DomainRessources/DomainRessourcesPresenter', () => 'DomainRessourcesPresenter');
jest.mock('../../../molecules/CostPerDomain/CostPerDomainPresenter', () => 'CostPerDomainPresenter');
jest.mock('../../../molecules/ProductCost/ProductCostPresenter', () => 'ProductCostPresenter');
jest.mock(
    '../../../molecules/MonthlyCostPerDomain/MonthlyCostPerDomainPresenter',
    () => 'MonthlyCostPerDomainPresenter'
);
jest.mock('../DomainFiltersPresenter', () => ({ DomainFiltersPresenter: 'DomainFiltersPresenter' }));
jest.doMock('../../../atoms/Filters/FiltersContext', () => ({
    DomainFiltersContext: 'FiltersContext',
    'DomainFiltersContext.Context': 'FiltersContext.Context'
}));

jest.doMock('../../../../../utils/fiscalYear', () => ({
    getCurrentDate: () => '2019-01-02',
    getYesterdayDate: () => '2019-01-01'
}));

import DomainDashboardPresenter from '../DomainDashboardPresenter';
import renderer from 'react-test-renderer';

describe(' DomainDashboardPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<DomainDashboardPresenter />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
