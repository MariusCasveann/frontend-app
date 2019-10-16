import { buildChartData } from '../../../helpers/checkChartData';
import { mapStateToProps } from '../AccumulatedProductCostWidget';
import { buildAggregatedChartData } from '../../../helpers/checkChartData';
import { QueryBilling_billingQuery } from '../../common/qraphql/__generated__/QueryBilling';
import {
    mockGraphQLError,
    mockDataEmpty,
    createMockedState,
    buildDataExpectedEmptyResults
} from '../../../../common/mock/MockData';

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

const buildDataExpectedResults = {
    labels: [
        'Customer Retention in "EUR"',
        'Checkout (Multichannel Experience) in "EUR"',
        'B2B Experience in "EUR"',
        'Service Management in "EUR"'
    ],
    datasets: [
        {
            data: [49198.94, 60463.31, 983.12, 6401.91]
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

describe('mapStateToProps', () => {
    it('should map state to props correctly', () => {
        const expectedResult = JSON.stringify({
            data: mockData,
            loading: false,
            error: mockGraphQLError.message
        });
        const result = JSON.stringify(
            mapStateToProps(createMockedState(), {
                accumulatedProductCost: { billingQuery: mockData, loading: false, error: mockGraphQLError }
            })
        );
        expect(result).toEqual(expectedResult);
    });
});

describe('when `buildAggregatedChartData` is called', () => {
    it('should return the correct result', () => {
        expect(buildAggregatedChartData('Accumulated product cost', mockData)).toMatchObject(buildDataExpectedResults);
    });

    it('should return the empty result', () => {
        expect(buildAggregatedChartData('Accumulated product cost', mockDataEmpty)).toMatchObject(
            buildDataExpectedEmptyResults
        );
    });
});
