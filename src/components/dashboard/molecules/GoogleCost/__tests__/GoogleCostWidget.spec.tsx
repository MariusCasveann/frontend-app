import { buildChartData, mapStateToProps } from '../GoogleCostWidget';
import { DeploymentStageEnum } from '../../../../../model/__generated__/globalTypes';
import { buildMonthValues, roundValue } from './../GoogleCostWidget';
import { QueryBilling_billingQuery } from '../../common/qraphql/__generated__/QueryBilling';
import { mockGraphQLError, createMockedState } from '../../../../common/mock/MockData';

const mockFiscalYear = true;
const mockStage = DeploymentStageEnum.DEV;
const mockLabels = ['Oct.', 'Nov.', 'Dec.', 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.'];
const mockData: QueryBilling_billingQuery[] = [
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 1,
        date: '2018-10-01T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 2,
        date: '2018-10-02T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 3,
        date: '2018-10-03T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 4,
        date: '2018-10-04T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 5,
        date: '2018-10-05T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 6,
        date: '2018-10-06T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 7,
        date: '2018-10-07T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 8,
        date: '2018-10-08T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 9,
        date: '2018-10-09T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 10,
        date: '2018-12-10T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 11,
        date: '2018-12-11T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 12,
        date: '2018-11-12T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'aggregated',
        cost: 12,
        date: '2018-11-12T00:00:00Z',
        currency: '"EUR"'
    }
];

const mockDataExtended = [...mockData, ...mockData];

const buildDataExpectedResults = {
    labels: mockLabels,
    datasets: [
        {
            data: [90, 48, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ]
};

const buildDataExpectedMonthValues = [90, 48, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0];

describe('when buildChartData is called', () => {
    it('should return the correct result', () => {
        expect(buildChartData(mockDataExtended, mockFiscalYear, mockStage)).toMatchObject(buildDataExpectedResults);
    });
});

describe('when buildMonthValues is called', () => {
    it('should return the correct result', () => {
        expect(buildMonthValues(mockDataExtended, mockFiscalYear)).toMatchObject(buildDataExpectedMonthValues);
    });
});

describe('when roundValue is called', () => {
    it('should return the correct result', () => {
        expect(roundValue(10001)).toBe(20000);
    });
    it('should return the same value result', () => {
        expect(roundValue(30000)).toBe(30000);
    });
    it('should return the correct result', () => {
        expect(roundValue(39999)).toBe(40000);
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
                googleCost: { billingQuery: mockData, loading: false, error: mockGraphQLError }
            })
        );
        expect(result).toEqual(expectedResult);
    });
});
