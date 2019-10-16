import React from 'react';
import renderer from 'react-test-renderer';

jest.doMock('../../../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card' }));

jest.doMock('../../../atoms/Filters/FiltersPresenter', () => ({ FiltersPresenter: 'FiltersPresenter' }));

import GovernanceFilterPresenter from '../GovernanceFilterPresenter';

describe('GovernanceFilterPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<GovernanceFilterPresenter />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
