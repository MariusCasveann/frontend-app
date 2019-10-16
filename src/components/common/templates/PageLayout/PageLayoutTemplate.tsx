import React, { ReactNode } from 'react';
import { Layout } from 'antd';

// components
import Breadcrumb from '../../molecules/Breadcrumb/BreadcrumbPresenter';
import SidebarPresenter from '../../organisms/Sidebar/SidebarPresenter';
import { Header } from '../..';

// interfaces
import { RouteI } from '../../../routes/components/RoutesConstants';
import { QueryAllProducts_allProducts } from '../../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';

interface PageLayoutTemplateProps {
    allowedRoutes: RouteI[];
    children: ReactNode;
    selectedProduct: QueryAllProducts_allProducts;
}

export default ({ allowedRoutes, children, selectedProduct }: PageLayoutTemplateProps) => (
    <Layout style={{ minHeight: '100vh' }}>
        <SidebarPresenter allowedRoutes={allowedRoutes} selectedProduct={selectedProduct} />
        <Layout>
            <Header />
            <Layout.Content>
                <Breadcrumb />
                {children}
            </Layout.Content>
        </Layout>
    </Layout>
);
