import {
    formatLabels,
    filteredData,
    filteredLabels,
    buildChartData,
    mappedData,
    buildAggregatedChartData,
    getTotalCost
} from '../checkChartData';
import { colors } from '../../../../config/colors';
import { QueryBilling_billingQuery } from '../../molecules/common/qraphql/__generated__/QueryBilling';

const mockData: QueryBilling_billingQuery[] = [
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'Customer Retention',
        cost: 49198.94,
        date: '2018-10-01T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'Checkout (Multichannel Experience)',
        cost: 60463.31,
        date: '2018-10-01T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'B2B Experience',
        cost: 983.12,
        date: '2018-10-01T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'Service Management',
        cost: 6401.91,
        date: '2018-10-01T00:00:00Z',
        currency: '"EUR"'
    }
];
const mockMappedData = [49198.94, 60463.31, 983.12, 6401.91];
const mockFilteredData = [
    {
        __typename: 'GoogleBillingResultDTO',
        cost: 49198.94,
        currency: '"EUR"',
        date: '2018-10-01T00:00:00Z',
        resourceType: 'Customer Retention'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        cost: 60463.31,
        currency: '"EUR"',
        date: '2018-10-01T00:00:00Z',
        resourceType: 'Checkout (Multichannel Experience)'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        cost: 983.12,
        currency: '"EUR"',
        date: '2018-10-01T00:00:00Z',
        resourceType: 'B2B Experience'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        cost: 6401.91,
        currency: '"EUR"',
        date: '2018-10-01T00:00:00Z',
        resourceType: 'Service Management'
    }
];
const mockFilteredLabels = [
    'Customer Retention in "EUR"',
    'Checkout (Multichannel Experience) in "EUR"',
    'B2B Experience in "EUR"',
    'Service Management in "EUR"'
];
const mockResult = [
    'Customer Retention (49198.94 "EUR")',
    'Checkout (Multichannel Experience) (60463.31 "EUR")',
    'B2B Experience (983.12 "EUR")',
    'Service Management (6401.91 "EUR")'
];

const mockBuildChartdata = {
    datasets: [
        {
            backgroundColor: ['#0c3d8a', '#859ec4', '#D8DADA', '#487ebd'],
            data: [49198.94, 60463.31, 983.12, 6401.91]
        }
    ],
    labels: [
        'Customer Retention in "EUR"',
        'Checkout (Multichannel Experience) in "EUR"',
        'B2B Experience in "EUR"',
        'Service Management in "EUR"'
    ]
};

const mockFilterData: QueryBilling_billingQuery[] = [
    {
        cost: 0.01,
        currency: 'EUR',
        date: '2019-09-26T00:00:00Z',
        resourceType: 'Cloud Key Management Service (KMS)',
        __typename: 'GoogleBillingResultDTO'
    },
    {
        cost: 6.93,
        currency: 'EUR',
        date: '2019-09-26T00:00:00Z',
        resourceType: 'Compute Engine',
        __typename: 'GoogleBillingResultDTO'
    },
    {
        cost: 0.19,
        currency: 'EUR',
        date: '2019-09-26T00:00:00Z',
        resourceType: 'Stackdriver Monitoring',
        __typename: 'GoogleBillingResultDTO'
    }
];

const mockBuildAggregatedChartData = {
    datasets: [
        {
            backgroundColor: colors,
            data: [49198.94, 60463.31, 983.12, 6401.91],
            label: 'label'
        }
    ],
    formattedLabels: [
        'Customer Retention (49198.94 "EUR")',
        'Checkout (Multichannel Experience) (60463.31 "EUR")',
        'B2B Experience (983.12 "EUR")',
        'Service Management (6401.91 "EUR")'
    ],
    labels: [
        'Customer Retention in "EUR"',
        'Checkout (Multichannel Experience) in "EUR"',
        'B2B Experience in "EUR"',
        'Service Management in "EUR"'
    ]
};

describe('Chart data', () => {
    it('formatLabelsshould return expected value', () => {
        expect(formatLabels(mockData)).toEqual(mockResult);
    });

    it('filteredData should return expected value', () => {
        expect(filteredData(mockData)).toEqual(mockFilteredData);
    });

    it('mappedData should return expected value', () => {
        expect(mappedData(mockData)).toEqual(mockMappedData);
    });

    it('filteredLabels should return expected value', () => {
        expect(filteredLabels(mockData)).toEqual(mockFilteredLabels);
    });

    it('buildChartData should return expected value', () => {
        expect(buildChartData(mockData)).toEqual(mockBuildChartdata);
    });

    it('buildAggregatedChartData should return expected value', () => {
        expect(buildAggregatedChartData('label', mockData)).toEqual(mockBuildAggregatedChartData);
    });

    it('getTotalCost should return expected value', () => {
        expect(getTotalCost(mockFilterData)).toEqual(7.13);
    });
});
