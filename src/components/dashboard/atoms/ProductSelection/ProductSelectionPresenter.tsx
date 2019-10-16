import React from 'react';
import { Select } from 'antd';
import { QueryAllProducts_allProducts } from './graphql/__generated__/QueryAllProducts';
import './../common/DashboardAtom.css';
import { API_MANAGEMENT } from '../../../../utils/constants';

const Option = Select.Option;

export interface ProductSelectionProps {
    loading?: boolean;
    error?: string;
    data?: QueryAllProducts_allProducts[];
    selectedProduct?: QueryAllProducts_allProducts;
    onProductSelected: (product?: QueryAllProducts_allProducts) => void;
}

export default (props: ProductSelectionProps) => {
    const { data, loading, selectedProduct, onProductSelected } = props;

    const selected = selectedProduct || (data && data[1]);
    const placeholder = loading === true ? 'loading... ' : selected && selected.name;
    const noProducts = data && data.length < 1;

    if (!selectedProduct) {
        if (onProductSelected && data) {
            const preselectedProduct = data.find(item => item.name === API_MANAGEMENT) || data[0];
            onProductSelected(preselectedProduct);
        }
    }

    return (
        <Select
            dropdownClassName="dropdown"
            showSearch={true}
            optionFilterProp="children"
            disabled={noProducts}
            value={selected && (selected.name as any)}
            placeholder={noProducts ? 'No products' : placeholder}
            onChange={(value: string) => {
                if (onProductSelected) {
                    onProductSelected(data && data.find(d => d.id === Number(value)));
                }
            }}
        >
            {data && data.map(d => <Option key={d.id}>{d.name}</Option>)}
        </Select>
    );
};
