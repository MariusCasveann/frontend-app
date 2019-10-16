import React from 'react';
import { List } from 'antd';
import { LightApplicationsOfProduct_lightApplicationsOfProduct } from './graphql/__generated__/LightApplicationsOfProduct';
import LoadingOrErrorPresenter from '../common/organisms/LoadingOrError/LoadingOrErrorPresenter';
import { Card } from '../common/molecules/CardLayout/CardLayout';

export interface ApplicationsProps {
    lightApplicationsOfProduct: LightApplicationsOfProduct_lightApplicationsOfProduct[] | null;
    loading: boolean;
    error: string;
}

export default ({ lightApplicationsOfProduct, loading, error }: ApplicationsProps) => {
    if (loading || error) {
        return (
            <Card width={100}>
                <LoadingOrErrorPresenter error={error} loading={loading} />
            </Card>
        );
    }
    if (lightApplicationsOfProduct && lightApplicationsOfProduct.length) {
        return (
            <Card width={100}>
                <List
                    itemLayout="horizontal"
                    header={
                        <List.Item>
                            <List.Item.Meta title="Name" />
                            <List.Item.Meta title="Exposed as a service" />
                        </List.Item>
                    }
                    dataSource={lightApplicationsOfProduct}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta title={item.name} />
                            <List.Item.Meta title={item.service && 'Is exposed as a service'} />
                        </List.Item>
                    )}
                />
            </Card>
        );
    }

    return <Card width={100}>No data</Card>;
};
