import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';
jest.doMock('antd', () => ({ Tabs: 'Tabs', TabPane: 'TabPane' }));
import TabsPresenter from '../TabsPresenter';

describe('TabsPresenter', () => {
    it('renders correctly', () => {
        const tabsData = [
            {
                tabContent: 'content',
                tabName: 'name'
            }
        ];
        const renderer = ShallowRenderer.createRenderer();
        renderer.render(<TabsPresenter tabsData={tabsData} />);
        const result = renderer.getRenderOutput();
        expect(result).toMatchSnapshot();
    });
});
