import { buildChartData } from './../MonthlyCostPerDomain';
import { QueryBilling_billingQuery } from '../../common/qraphql/__generated__/QueryBilling';
import { mockDataEmpty, buildDataExpectedEmptyResults } from '../../../../common/mock/MockData';

const mockData: QueryBilling_billingQuery[] = [
    {
        cost: 36.19,
        currency: 'EUR',
        date: '2019-01-01T00:00:00Z',
        resourceType: 'backoffice',
        __typename: 'GoogleBillingResultDTO'
    },
    {
        cost: 17.99,
        currency: null,
        date: '2019-01-02T00:00:00Z',
        resourceType: 'backoffice',
        __typename: 'GoogleBillingResultDTO'
    },
    {
        cost: 12.99,
        currency: null,
        date: '2019-01-03T00:00:00Z',
        resourceType: 'backoffice',
        __typename: 'GoogleBillingResultDTO'
    },
    {
        cost: 35.97,
        currency: 'EUR',
        date: '2019-01-01T00:00:00Z',
        resourceType: 'product-data',
        __typename: 'GoogleBillingResultDTO'
    }
];

const buildDataExpectedResults = {
    labels: ['backoffice', 'product-data'],
    datasets: [
        {
            data: [67.17, 35.97]
        }
    ]
};

describe('when `buildChartData` is called', () => {
    it('should return the correct result', () => {
        expect(buildChartData(mockData)).toMatchObject(buildDataExpectedResults);
    });

    it('should return the empty result', () => {
        expect(buildChartData(mockDataEmpty)).toMatchObject(buildDataExpectedEmptyResults);
    });
});
