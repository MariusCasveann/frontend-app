import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('../../../molecules/GoogleCost/GoogleCostPresenter', () => 'GoogleCostPresenter');
jest.mock('../DeploymentFrequencyWidget', () => 'DeploymentFrequencyWidget');
jest.doMock('../../../atoms/Filters/FiltersContext', () => ({
    FiltersContext: 'FiltersContext',
    'FiltersContext.Consumer': 'FiltersContext.Consumer'
}));
import DeploymentFrequencyPresenter from '../DeploymentFrequencyPresenter';

describe(' DeploymentFrequencyPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<DeploymentFrequencyPresenter />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
