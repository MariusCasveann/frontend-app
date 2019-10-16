import { QueryBilling_billingQuery } from '../../common/qraphql/__generated__/QueryBilling';
import { mapStateToProps } from '../CostPerDomainWidget';
import { mockGraphQLError, createMockedState } from '../../../../common/mock/MockData';

const mockData: QueryBilling_billingQuery[] = [
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'Aggregated',
        cost: 6665.07,
        date: '2018-10-01T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'Cloud CDN',
        cost: 0.31,
        date: '2018-10-01T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'Cloud Functions',
        cost: 23.12,
        date: '2018-10-01T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'Cloud SQL',
        cost: 2222.46,
        date: '2018-10-01T00:00:00Z',
        currency: '"EUR"'
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
                costPerDomain: { billingQuery: mockData, loading: false, error: mockGraphQLError }
            })
        );
        expect(result).toEqual(expectedResult);
    });
});
