import * as React from 'react';
import { Spin } from 'antd';
import './LoadingIndicator.css';

export default () => (
    <div className="loading-indicator">
        <Spin size="large" />
    </div>
);
