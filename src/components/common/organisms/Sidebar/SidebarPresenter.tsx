import React from 'react';
import { debounce } from 'lodash';
import { Menu, Layout, Icon } from 'antd';
import { createHashHistory } from 'history';

// constants
import { Navigation, navigationOptions, RouteI } from '../../../routes/components/RoutesConstants';

// components
import SelectedProduct from './SelectedProduct';

// css
import './Sidebar.css';

// interfaces
import { shouldRenderNavItem } from '../../../routes/helpers/routesHelper';
import { QueryAllProducts_allProducts } from '../../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';

const { Sider } = Layout;
const history = createHashHistory();

const renderMenuItem = (item: Navigation) => (
    <Menu.Item key={item.navLink} onClick={() => history.push(item.navLink)}>
        <Icon type={item.icon} />
        {item.label}
    </Menu.Item>
);

interface SidebarPresenterProps {
    allowedRoutes: RouteI[];
    selectedProduct: QueryAllProducts_allProducts;
}

export default class SidebarPresenter extends React.Component<SidebarPresenterProps> {
    public state = {
        collapse: false
    };

    public componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }

    private setCollapse = () => {
        this.setState({ collapse: !this.state.collapse });
    };

    private setCollapseOnWindowResize = () => {
        if (document.documentElement.clientWidth < 768 && !this.state.collapse) {
            this.setState({
                collapse: true
            });
        } else if (document.documentElement.clientWidth > 768 && this.state.collapse) {
            this.setState({ collapse: false });
        }
    };

    private onResize = debounce(this.setCollapseOnWindowResize, 100);

    public render() {
        const { collapse } = this.state;
        const { allowedRoutes, selectedProduct } = this.props;

        return (
            <Sider collapsible={true} collapsed={collapse} onCollapse={() => this.setCollapse()}>
                <Menu mode="inline" theme="dark" style={{ height: '100%' }}>
                    <SelectedProduct showSelect={!collapse} />
                    {navigationOptions.map((item: Navigation) => {
                        if (shouldRenderNavItem(item, allowedRoutes, selectedProduct)) {
                            if (!item.children) {
                                return renderMenuItem(item);
                            }

                            return (
                                <Menu.SubMenu
                                    key={item.navLink}
                                    className="admin-submenu"
                                    title={
                                        <React.Fragment>
                                            <Icon type={item.icon} />
                                            <span>{item.label}</span>
                                        </React.Fragment>
                                    }
                                >
                                    {item.children.map((child: Navigation) => renderMenuItem(child))}
                                </Menu.SubMenu>
                            );
                        }

                        return false;
                    })}
                </Menu>
            </Sider>
        );
    }
}
