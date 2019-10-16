import * as React from 'react';

// components
import GovernanceDashboardPresenter from '../GovernanceDashboard/GovernanceDashboardPresenter';
import { TabProps } from '../../../common/molecules/Tabs/TabsPresenter';
import { TabsPresenter } from '../../../common/molecules/Tabs';

// style
import './DashboardTabs.css';
import DomainDashboardPresenter from '../DomainDashboard/DomainDashboardPresenter';
import ProductDashboardPresenter from '../ProductDashboard/ProductDashboardPresenter';

const tabs: TabProps[] = [
    {
        tabContent: GovernanceDashboardPresenter,
        tabName: 'Governance'
    },
    {
        tabContent: DomainDashboardPresenter,
        tabName: 'Domain'
    },
    {
        tabContent: ProductDashboardPresenter,
        tabName: 'Product'
    }
];

export default () => (
    <div className="dashboard-page">
        <TabsPresenter tabsData={tabs} />
    </div>
);
