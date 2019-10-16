import React from 'react';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import CpuUtilizationWidget from './CpuUtilizationWidget';
import { QueryAllProducts_allProducts } from '../../atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';

interface CpuUtilizationPresenterProps {
    selectedProduct: QueryAllProducts_allProducts | undefined;
}

export default ({ selectedProduct }: CpuUtilizationPresenterProps) => (
    <FiltersContext.Consumer>
        {({ fromDate, toDate }) => (
            <Card className="cpu-utilization-card" title="CPU utilization" width={45}>
                {selectedProduct && (
                    <CpuUtilizationWidget
                        fromDate={fromDate}
                        toDate={toDate}
                        selectedProductId={selectedProduct && selectedProduct.id}
                    />
                )}
            </Card>
        )}
    </FiltersContext.Consumer>
);
