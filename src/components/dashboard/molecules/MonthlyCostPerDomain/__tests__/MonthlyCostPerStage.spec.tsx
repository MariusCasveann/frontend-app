import { mapStateToProps } from './../MonthlyCostPerStage';
import { QueryBilling_billingQuery } from '../../common/qraphql/__generated__/QueryBilling';
import { mockGraphQLError, createMockedState } from '../../../../common/mock/MockData';

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

describe('mapStateToProps', () => {
    it('should map state to props correctly', () => {
        const expectedResult = JSON.stringify({
            data: mockData,
            loading: false,
            error: mockGraphQLError.message
        });
        const result = JSON.stringify(
            mapStateToProps(createMockedState(), {
                costPerStage: { billingQuery: mockData, loading: false, error: mockGraphQLError }
            })
        );
        expect(result).toEqual(expectedResult);
    });
});
