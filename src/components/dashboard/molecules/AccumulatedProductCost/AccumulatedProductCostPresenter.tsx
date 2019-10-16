import React from 'react';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import AccumulatedProductCostWidget from './AccumulatedProductCostWidget';
import { QueryAllProducts_allProducts } from '../../atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';

interface AccumulatedProductCostPresenterProps {
    selectedProduct: QueryAllProducts_allProducts | undefined;
}

export default ({ selectedProduct }: AccumulatedProductCostPresenterProps) => (
    <FiltersContext.Consumer>
        {({ fromDate, toDate, financialYear }) => (
            <Card className="accumulated-product-cost-card" title="Accumulated product cost" width={100}>
                {selectedProduct && (
                    <AccumulatedProductCostWidget
                        fromDate={fromDate}
                        financialYear={financialYear}
                        toDate={toDate}
                        selectedProductId={selectedProduct && selectedProduct.id}
                    />
                )}
            </Card>
        )}
    </FiltersContext.Consumer>
);
