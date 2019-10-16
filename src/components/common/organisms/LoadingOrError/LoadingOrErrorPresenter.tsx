import * as React from 'react';
import { Spin } from 'antd';
import './LoadingOrError.css';

interface LoadingOrErrorWrapperProps {
    error?: string;
    loading?: boolean;
}

export default ({ error, loading }: LoadingOrErrorWrapperProps) => {
    if (loading) {
        return (
            <div className="card-content-loading">
                <Spin size="large" spinning={true} />
            </div>
        );
    }
    if (error) {
        return <div>{error}</div>;
    }
    return <div>{''}</div>;
};
