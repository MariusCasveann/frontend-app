import * as React from 'react';
import { Icon } from 'backoffice-shared-components';
import { UserMenu } from './../../../authentication';
import { Layout } from 'antd';
import './Header.css';

export default () => (
    <Layout.Header>
        <div className="header-menu">
            <Icon type="grid" className="grid-icon" />
            <UserMenu />
        </div>
    </Layout.Header>
);
