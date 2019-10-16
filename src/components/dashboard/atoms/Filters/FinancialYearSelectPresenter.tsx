import React from 'react';
import { Select } from 'antd';
import { fiscalYear, isNumber } from '../../../../utils/fiscalYear';
import { FiltersContext } from './FiltersContext';
import './Filters.css';
import { generateOptions } from './FiltersPresenter';

interface SelectProps {
    setFromDate: (data: string) => void;
    setToDate: (data: string) => void;
    setFinancialYear: (data: string | null) => void;
}

const onSelectChange = ({ setFromDate, setToDate, setFinancialYear }: SelectProps) => (value: string) => {
    if (value && isNumber(value)) {
        const fiscalStart = `${Number(value) - 1}-10-01`;
        const fiscalEnd = `${Number(value)}-09-30`;
        setFromDate(fiscalStart);
        setToDate(fiscalEnd);
        setFinancialYear(value);
    }
};
export const FinancialYearSelectPresenter = () => (
    <FiltersContext.Consumer>
        {({ setFromDate, setToDate, setFinancialYear, financialYear }) => (
            <Select
                className="select-financial-year"
                defaultValue={financialYear || 'Select financial year'}
                onChange={onSelectChange({
                    setFromDate,
                    setToDate,
                    setFinancialYear
                })}
            >
                {generateOptions(fiscalYear)}
            </Select>
        )}
    </FiltersContext.Consumer>
);
