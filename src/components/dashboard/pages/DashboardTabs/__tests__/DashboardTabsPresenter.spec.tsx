import * as React from 'react';

jest.mock(
    '../../../../dashboard/pages/GovernanceDashboard/GovernanceDashboardPresenter',
    () => 'GovernanceDashboardPresenter'
);
jest.mock('../../../../common/molecules/Tabs/TabsPresenter', () => ({ TabProps: 'TabProps' }));
jest.mock('../../../../common/molecules/Tabs', () => ({ TabsPresenter: 'TabsPresenter' }));

import DashboardTabsPresenter from './../DashboardTabsPresenter';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('DashboardTabsPresenter', () => {
    it('renders correctly', () => {
        const renderer = ShallowRenderer.createRenderer();
        renderer.render(<DashboardTabsPresenter />);
        const result = renderer.getRenderOutput();
        expect(result).toMatchSnapshot();
    });
});
