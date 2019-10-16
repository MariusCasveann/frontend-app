import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export interface TabProps {
    tabContent: React.Component | string | any;
    tabName: string;
}

export interface TabsProps {
    tabsData: TabProps[];
    defaultActiveKey?: string;
}

export default ({ tabsData, defaultActiveKey = '0' }: TabsProps) => (
    <Tabs defaultActiveKey={defaultActiveKey} type="card">
        {tabsData.map((item, index) => (
            <TabPane tab={item.tabName} key={index.toString()}>
                {typeof item.tabContent === 'string' ? item.tabContent : <item.tabContent />}
            </TabPane>
        ))}
    </Tabs>
);
