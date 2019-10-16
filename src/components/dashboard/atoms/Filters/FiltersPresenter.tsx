import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import { RangePickerValue, RangePickerPresetRange } from 'antd/lib/date-picker/interface';
import { fiscalYear, getCurrentDate, getYesterdayDate, isNumber } from '../../../../utils/fiscalYear';
import { FiltersContext } from './FiltersContext';
import './Filters.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface OnChangeProps {
    setFromDate: (data: string) => void;
    setToDate: (data: string) => void;
    setFinancialYear: (data: string | null) => void;
    setTemporaryFromDate: (data: string) => void;
    setTemporaryToDate: (data: string) => void;
    setTemporaryFinancialYear: (data: string | null) => void;
}

interface FiltersPresenterProps {
    fromDateInitialValue?: string;
}

interface OnOkCallbackProps {
    setFromDate: (data: string) => void;
    setToDate: (data: string) => void;
    setFinancialYear: (data: string | null) => void;
    temporaryFinancialYear: string | null;
    temporaryFromDate: string;
    temporaryToDate: string;
}

interface SelectProps {
    setTemporaryFromDate: (data: string) => void;
    setTemporaryToDate: (data: string) => void;
    setTemporaryFinancialYear: (data: string | null) => void;
}

const dateFormat = 'YYYY-MM-DD';
const today = getCurrentDate();

const onOkCallback = ({ setFromDate, setToDate, setFinancialYear, temporaryFinancialYear }: OnOkCallbackProps) => (
    range: RangePickerPresetRange
) => {
    const dates = range as RangePickerValue;
    if (dates && dates[0] && dates[1]) {
        if (temporaryFinancialYear) {
            setFinancialYear(temporaryFinancialYear);
        } else {
            setFinancialYear(null);
        }

        setFromDate(dates[0].format(dateFormat));
        setToDate(dates[1].format(dateFormat));
    }
};

const onSelectChange = ({ setTemporaryFromDate, setTemporaryToDate, setTemporaryFinancialYear }: SelectProps) => (
    value: string
) => {
    if (value && isNumber(value)) {
        const fiscalStart = `${Number(value) - 1}-10-01`;
        const fiscalEnd = `${Number(value)}-09-30`;
        setTemporaryFromDate(fiscalStart);
        setTemporaryToDate(fiscalEnd);
        setTemporaryFinancialYear(value);
    }
};

/*
 *  Function to be called when start date and end date are changing
 *  We store the dates in temporary variables until we press the 'ok' button
 *  This function is called also when clear button (x) is pressed: in this case the datesString is: ["", ""]
 */

const onChange = ({
    setFromDate,
    setToDate,
    setFinancialYear,
    setTemporaryToDate,
    setTemporaryFromDate,
    setTemporaryFinancialYear
}: OnChangeProps) => (date: RangePickerValue, datesString: [string, string]) => {
    if (!datesString[0] && !datesString[1]) {
        setFromDate(getYesterdayDate());
        setFinancialYear(null);
        setToDate(today);
        setTemporaryToDate(today);
        setTemporaryFromDate(getYesterdayDate());
    } else {
        setTemporaryFinancialYear(null);
        setTemporaryFromDate(moment(datesString[0]).format(dateFormat));
        setTemporaryToDate(moment(datesString[1]).format(dateFormat));
    }
};

export const generateOptions = (financialYear: number) => {
    const fiscalYearsOptions: number[] = [financialYear, financialYear - 1, financialYear - 2];
    return fiscalYearsOptions.map((item: number) => (
        <Option key={item} value={item}>
            {item}
        </Option>
    ));
};

export const FiltersPresenter = ({ fromDateInitialValue }: FiltersPresenterProps) => {
    const [temporaryFromDate, setTemporaryFromDate] = useState<string>(fromDateInitialValue || getYesterdayDate());
    const [temporaryToDate, setTemporaryToDate] = useState<string>(today);
    const [temporaryFinancialYear, setTemporaryFinancialYear] = useState<string | null>(null);

    return (
        <FiltersContext.Consumer>
            {({ setFromDate, setToDate, setFinancialYear, financialYear }) => (
                <RangePicker
                    className="date-picker-selector"
                    showTime={true}
                    value={[moment(temporaryFromDate), moment(temporaryToDate)]}
                    defaultValue={[moment(today), moment(today)]}
                    format={dateFormat}
                    renderExtraFooter={() => (
                        <Select
                            style={{ width: 200 }}
                            defaultValue={financialYear || 'Select financial year'}
                            onChange={onSelectChange({
                                setTemporaryFromDate,
                                setTemporaryToDate,
                                setTemporaryFinancialYear
                            })}
                        >
                            {generateOptions(fiscalYear)}
                        </Select>
                    )}
                    onChange={onChange({
                        setToDate,
                        setFromDate,
                        setFinancialYear,
                        setTemporaryToDate,
                        setTemporaryFromDate,
                        setTemporaryFinancialYear
                    })}
                    onOk={onOkCallback({
                        setFromDate,
                        setToDate,
                        setFinancialYear,
                        temporaryToDate,
                        temporaryFromDate,
                        temporaryFinancialYear
                    })}
                />
            )}
        </FiltersContext.Consumer>
    );
};
