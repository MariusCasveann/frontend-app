import {
    month,
    monthLabels,
    fiscalYearMonthLabels,
    currentYear,
    getFromDate,
    getToDate,
    daysInMonth,
    getYear,
    getFiscalYear,
    customFormat,
    isNumber
} from '../fiscalYear';

describe('FiscalYear', () => {
    it('fiscal year should be currentYear-1', () => {
        expect(getFiscalYear(9)).toBe(currentYear - 1);
    });

    it('fiscal year should be currentYear', () => {
        expect(getFiscalYear(10)).toBe(currentYear);
    });

    it('year should be currentYear-1', () => {
        expect(getYear(month + 1)).toBe(currentYear - 1);
    });

    it('year should be currentYear', () => {
        expect(getYear(month - 1)).toBe(currentYear);
    });

    it('days in month should be 31', () => {
        expect(daysInMonth(3, 2019)).toBe(31);
    });

    it('days in month should be 28', () => {
        expect(daysInMonth(2, 2019)).toBe(28);
    });

    it('the fromDate should be should be with 0', () => {
        expect(getFromDate(8)).toBe(getYear(9) + '-09' + '-01');
    });

    it('the fromDate should be should be with 0', () => {
        expect(getFromDate(9)).toBe(getYear(9) + '-10' + '-01');
    });

    it('the toDate should be should be with 0', () => {
        expect(getToDate(8)).toBe(getYear(9) + '-09' + '-30');
    });

    it('the toDate should be should be with 0', () => {
        expect(getToDate(9)).toBe(getYear(9) + '-10' + '-31');
    });

    it('month labels should be 12', () => {
        expect(monthLabels).toHaveLength(12);
    });

    it('month labels start with Jan.', () => {
        expect(monthLabels[0]).toEqual('Jan.');
    });

    it('month labels end with Dec.', () => {
        expect(monthLabels[11]).toEqual('Dec.');
    });

    it('fiscal year month labels should be 12', () => {
        expect(fiscalYearMonthLabels).toHaveLength(12);
    });

    it('fiscal year starts with Oct.', () => {
        expect(fiscalYearMonthLabels[0]).toEqual('Oct.');
    });

    it('fiscal year ends with Sep.', () => {
        expect(fiscalYearMonthLabels[11]).toEqual('Sep.');
    });

    it('customFormat should return the expected value when date is smaller than 10', () => {
        expect(customFormat(9)).toEqual('09');
    });

    it('customFormat should return the expected value when date is bigger than 10', () => {
        expect(customFormat(23)).toEqual(23);
    });

    it('isNumber should return true if value is number', () => {
        expect(isNumber('12')).toBeTruthy();
    });

    it('isNumber should return false if value is not a number', () => {
        expect(isNumber('12aa')).toBeFalsy();
    });
});
