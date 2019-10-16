import React from 'react';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import DeploymentFrequencyWidget from '../DeploymentFrequency/DeploymentFrequencyWidget';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';
import { QueryAllProducts_allProducts } from '../../atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { QueryEntity } from '../../../../model/__generated__/globalTypes';
import '../DeploymentFrequency/DeploymentFrequency.css';

interface DeploymentFrequencyPerProductPresenterProps {
    selectedProduct: QueryAllProducts_allProducts | undefined;
}

export default ({ selectedProduct }: DeploymentFrequencyPerProductPresenterProps) => (
    <FiltersContext.Consumer>
        {({ fromDate, toDate }) => (
            <Card title="Deployment Frequency KPIs" width={45} className="deployment-frequency-per-resource-card">
                {selectedProduct && (
                    <DeploymentFrequencyWidget
                        fromDate={fromDate}
                        toDate={toDate}
                        showTotalBuilds={false}
                        entityType={QueryEntity.product}
                        selectedEntityState={selectedProduct}
                    />
                )}
            </Card>
        )}
    </FiltersContext.Consumer>
);
