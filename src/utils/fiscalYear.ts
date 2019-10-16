export const today = new Date();
export const month = today.getMonth();
export const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
export const currentMonth = today.getMonth() + 1;
export const currentYear = today.getFullYear();

export const fiscalYear = currentMonth > 9 ? currentYear + 1 : currentYear;

export const getFiscalYear = (currentMonthIndex: number) => {
    return currentMonthIndex > 9 ? currentYear : currentYear - 1;
};

export const daysInMonth = (monthIndex: number, year: number) => new Date(year, monthIndex, 0).getDate();

export const getYear = (id: number) => {
    const index = month - id;
    return index < 0 ? currentYear - 1 : currentYear;
};

export const getFromDate = (id: number) => {
    return getYear(id) + '-' + (id < 9 || id === 0 ? '0' + (id + 1) : id + 1) + '-01';
};

export const getToDate = (id: number) => {
    return getYear(id) + '-' + (id < 9 || id === 0 ? '0' + (id + 1) : id + 1) + '-' + daysInMonth(id + 1, getYear(id));
};

export const fiscalYearStart = `${today.getFullYear()}-10-01`;
export const notFiscalYearStart = `${today.getFullYear()}-01-01`;
export const fiscalYearEnd = `${today.getFullYear() + 1}-09-30`;
export const notFiscalYearEnd = `${today.getFullYear()}-12-31`;

export const monthLabels = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.'
];

export interface Month {
    id: number;
    name: string;
}

export const months: Month[] = [
    {
        id: 0,
        name: 'January'
    },
    {
        id: 1,
        name: 'February'
    },
    {
        id: 2,
        name: 'March'
    },
    {
        id: 3,
        name: 'April'
    },
    {
        id: 4,
        name: 'May'
    },
    {
        id: 5,
        name: 'June'
    },
    {
        id: 6,
        name: 'July'
    },
    {
        id: 7,
        name: 'August'
    },
    {
        id: 8,
        name: 'September'
    },
    {
        id: 9,
        name: 'October'
    },
    {
        id: 10,
        name: 'November'
    },
    {
        id: 11,
        name: 'December'
    }
];

export const fiscalYearMonthLabels = monthLabels.slice(9, 12).concat(monthLabels.slice(0, 9));

export const customFormat = (mm: number) => (mm > 9 && mm) || `0${mm}`;

export const getCurrentDate = () => {
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // January is 0!

    return today.getFullYear() + '-' + customFormat(mm) + '-' + customFormat(dd);
};

export const getYesterdayDate = () => {
    const dd = yesterday.getDate();
    const mm = today.getMonth() + 1; // January is 0!

    return today.getFullYear() + '-' + customFormat(mm) + '-' + customFormat(dd);
};

export const isNumber = (value: string | number): boolean => value != null && !isNaN(Number(value.toString()));
