import React from 'react';
import renderer from 'react-test-renderer';

jest.doMock('../../../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card' }));
jest.mock('../DomainCostWidget', () => 'DomainCostWidget');
jest.doMock('../../../atoms/Filters/FiltersContext', () => ({
    FiltersContext: 'FiltersContext',
    'FiltersContext.Consumer': 'FiltersContext.Consumer'
}));

import DomainCostPresenter from '../DomainCostPresenter';

describe(' DomainCostPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<DomainCostPresenter />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
