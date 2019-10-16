import React from 'react';
import { FiltersPresenter } from '../../atoms/Filters/FiltersPresenter';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import ProductSelection from '../../atoms/ProductSelection/ProductSelection';
import { QueryAllProducts_allProducts } from '../../atoms/ProductSelection/graphql/__generated__/QueryAllProducts';

interface ProductFiltersPresenterProps {
    selectedProduct: QueryAllProducts_allProducts | undefined;
    setSelectedProduct: (product?: QueryAllProducts_allProducts) => void;
}

export const ProductFiltersPresenter = ({ selectedProduct, setSelectedProduct }: ProductFiltersPresenterProps) => (
    <Card title="Filter" width={100}>
        <FiltersPresenter />
        <ProductSelection
            onProductSelected={(value: QueryAllProducts_allProducts) => {
                setSelectedProduct(value);
            }}
            selectedProduct={selectedProduct}
        />
    </Card>
);
