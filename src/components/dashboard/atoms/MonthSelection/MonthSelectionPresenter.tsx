import React from 'react';
import { Select } from 'antd';
import { months } from './../../../../utils/fiscalYear';

const Option = Select.Option;

export interface MonthSelectionProps {
    selectedMonth?: string;
    onMonthSelected: (month?: string) => void;
}

export default (props: MonthSelectionProps) => {
    const { selectedMonth, onMonthSelected } = props;

    const selected = selectedMonth || months[0].name;

    if (!selectedMonth) {
        if (onMonthSelected && months) {
            onMonthSelected(months[0].name);
        }
    }

    return (
        <Select
            dropdownClassName="dropdown"
            showSearch={true}
            optionFilterProp="children"
            value={selected}
            placeholder={selected}
            onChange={(value: string) => {
                if (onMonthSelected) {
                    onMonthSelected(value);
                }
            }}
        >
            {months && months.map(month => <Option key={month.id}>{month.name}</Option>)}
        </Select>
    );
};
