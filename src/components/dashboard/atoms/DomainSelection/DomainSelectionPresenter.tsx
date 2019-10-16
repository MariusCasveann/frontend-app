import React from 'react';
import { Select } from 'antd';
import { QueryAllDomains_allDomains } from './graphql/__generated__/QueryAllDomains';
import './../common/DashboardAtom.css';
import { ENGINEERING_PLATFORM } from '../../../../utils/constants';

const Option = Select.Option;

export interface DomainSelectionProps {
    loading?: boolean;
    error?: string;
    data?: QueryAllDomains_allDomains[];
    selectedDomain?: QueryAllDomains_allDomains;
    onDomainSelected: (domain?: QueryAllDomains_allDomains) => void;
}

export default (props: DomainSelectionProps) => {
    const { data, loading, selectedDomain, onDomainSelected } = props;

    const selected = selectedDomain || (data && data[0]);
    const placeholder = loading === true ? 'loading... ' : selected && selected.name;
    const noDomains = data && data.length < 1;

    if (!selectedDomain) {
        if (onDomainSelected && data) {
            const preselectedDomain = data.find(item => item.name === ENGINEERING_PLATFORM) || data[0];
            onDomainSelected(preselectedDomain);
        }
    }

    return (
        <Select
            dropdownClassName="dropdown"
            showSearch={true}
            optionFilterProp="children"
            disabled={noDomains}
            value={selected && (selected.name as any)}
            placeholder={noDomains ? 'No domains' : placeholder}
            onChange={(value: string) => {
                if (onDomainSelected) {
                    onDomainSelected(data && data.find(d => d.id === Number(value)));
                }
            }}
        >
            {data && data.map(d => <Option key={d.id}>{d.name}</Option>)}
        </Select>
    );
};
