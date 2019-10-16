import React from 'react';
import { MESSAGE_WHEN_NO_DATA } from '../../../../utils/constants';

export interface Filter {
    fromDate: string;
    toDate: string;
    setFromDate: (date: string) => void;
    setToDate: (date: string) => void;
    financialYear: string | null;
    setFinancialYear: (value: string | null) => void;
    messageWhenNoData?: string;
}

export const FiltersContext = React.createContext<Filter>({
    fromDate: '2019-01-01',
    toDate: '2019-01-02',
    setFromDate: () => ({}),
    setToDate: () => ({}),
    financialYear: null,
    setFinancialYear: () => ({}),
    messageWhenNoData: MESSAGE_WHEN_NO_DATA
});
