import React from 'react';
import { Select } from 'antd';

// interfaces
import { QueryAllProducts_allProducts } from '../../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';

// redux
import { SetSelectedProduct } from '../../../../state/products/ProductsActions';
import { ALL_PRODUCTS_ITEM } from '../../../../state/products/ProductsState';

interface SelectedProductProps {
    selectedProduct: QueryAllProducts_allProducts;
    allProducts: QueryAllProducts_allProducts[];
    showSelect: boolean;
    setSelectedProduct: (payload: { selectedProduct: QueryAllProducts_allProducts }) => SetSelectedProduct;
}

const { Option } = Select;

const setSelectedValue = (
    callback: (payload: { selectedProduct: QueryAllProducts_allProducts }) => SetSelectedProduct
) => (value: string) => {
    const selectedProduct = JSON.parse(value);
    callback(selectedProduct);
};

export default (props: SelectedProductProps) => {
    const {
        selectedProduct: { name },
        allProducts,
        showSelect,
        setSelectedProduct
    } = props;

    if (showSelect) {
        return (
            <Select
                showSearch={true}
                style={{ width: 200 }}
                className="product-select"
                value={name || ''}
                onChange={setSelectedValue(setSelectedProduct)}
                placeholder="Select product"
                optionLabelProp="name"
                optionFilterProp="children"
            >
                {allProducts &&
                    [ALL_PRODUCTS_ITEM].concat(allProducts).map((d: QueryAllProducts_allProducts) => (
                        <Option value={JSON.stringify(d)} key={d.name || ''}>
                            {d.name}
                        </Option>
                    ))}
            </Select>
        );
    }

    return <div />;
};
