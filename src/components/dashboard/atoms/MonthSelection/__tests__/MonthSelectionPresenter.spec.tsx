import * as React from 'react';
import renderer from 'react-test-renderer';
jest.doMock('antd', () => ({ Select: 'Select', Option: 'Option' }));
import MonthSelectionPresenter from '../MonthSelectionPresenter';
import { mockFunction } from '../../../../common/mock/MockData';

const mockSelectedMonth: string = 'September';

describe('MonthSelectionPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<MonthSelectionPresenter onMonthSelected={mockFunction} selectedMonth={mockSelectedMonth} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
