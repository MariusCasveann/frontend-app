import * as React from 'react';
jest.mock('../../../organisms/Sidebar/SidebarPresenter', () => 'SidebarPresenter');
jest.mock('../../..', () => ({ Header: 'Header' }));
jest.mock('../../../molecules/Breadcrumb/BreadcrumbPresenter', () => 'Breadcrumb');
jest.doMock('antd', () => ({ Layout: 'Layout', Content: 'Content' }));
// components
import PageLayoutTemplate from '../PageLayoutTemplate';
import renderer from 'react-test-renderer';
import { mockSelectedProduct } from '../../../mock/MockData';

const mockChildren = <div>Test</div>;

describe('PageTemplate', () => {
    it('renders a react component ', () => {
        const tree = renderer
            .create(
                <PageLayoutTemplate allowedRoutes={[]} selectedProduct={mockSelectedProduct} children={mockChildren} />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
