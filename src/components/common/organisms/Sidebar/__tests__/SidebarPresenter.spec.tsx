import ShallowRenderer from 'react-test-renderer/shallow';
import * as React from 'react';
import { shallow } from 'enzyme';
import { RouteI } from '../../../../routes/components/RoutesConstants';
import SidebarPresenter from '../SidebarPresenter';
import Sider from 'antd/lib/layout/Sider';
import { mockSelectedProduct } from '../../../mock/MockData';

const mockAllowedRoutes: RouteI[] = [
    {
        allowedRoles: ['DP God', 'NETWORK_READ'],
        checkAdminRole: true,
        path: '/admin/deployment-stages'
    },
    {
        allowedRoles: ['DP God'],
        checkAdminRole: true,
        path: '/admin/external-tools'
    },
    {
        allowedRoles: ['DP God', 'READ', 'WRITE'],
        checkAdminRole: true,
        path: '/application/:id'
    }
];

// tslint:disable-next-line:no-any
const _ShallowRenderer: any = ShallowRenderer;
const renderer = new _ShallowRenderer();

const tree = renderer.render(
    <SidebarPresenter selectedProduct={mockSelectedProduct} allowedRoutes={mockAllowedRoutes} />
);
const result = renderer.getRenderOutput();
const wrapper = shallow(<SidebarPresenter selectedProduct={mockSelectedProduct} allowedRoutes={mockAllowedRoutes} />);

describe('SidebarPresenter', () => {
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });
    it('renders a Sider', () => {
        expect(result.type).toBe(Sider);
    });
    it('renders a Menu', () => {
        expect(wrapper.find('Menu').exists()).toBe(true);
    });
    it('renders the number of MenuItems provided', () => {
        expect(wrapper.find('MenuItem').length).toEqual(4);
    });
    it('renders the number of Icons provided', () => {
        expect(wrapper.find('Icon').length).toEqual(4);
    });
    it('renders SubMenu', () => {
        expect(wrapper.find('SubMenu').exists()).toBe(true);
    });
});
