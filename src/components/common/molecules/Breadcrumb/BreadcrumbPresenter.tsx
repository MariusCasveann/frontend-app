import * as React from 'react';
import { Breadcrumb } from 'antd';

import './Breadcrumb.css';

export default () => (
    <div className="breadcrumb-padding breadcrumb-font">
        <Breadcrumb>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
                <a href="#/dashboard">Billing</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Billing Item</Breadcrumb.Item>
        </Breadcrumb>
    </div>
);
