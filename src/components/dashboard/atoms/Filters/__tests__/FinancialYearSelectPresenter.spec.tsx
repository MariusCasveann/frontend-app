import * as React from 'react';
import renderer from 'react-test-renderer';

jest.doMock('./../FiltersContext', () => ({
    FiltersContext: 'FiltersContext',
    'FiltersContext.Consumer': 'FiltersContext.Consumer'
}));

import { FinancialYearSelectPresenter } from '../FinancialYearSelectPresenter';

describe('FinancialYearSelectPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<FinancialYearSelectPresenter />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
