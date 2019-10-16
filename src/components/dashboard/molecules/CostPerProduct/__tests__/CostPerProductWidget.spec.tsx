import { QueryBilling_billingQuery } from '../../common/qraphql/__generated__/QueryBilling';
import { mapStateToProps } from '../CostPerProductWidget';
import { mockGraphQLError, createMockedState } from '../../../../common/mock/MockData';

const mockData: QueryBilling_billingQuery[] = [
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'Stackdriver Logging',
        cost: 1.08,
        date: '2018-10-01T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'Compute Engine',
        cost: 17.59,
        date: '2018-10-01T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'Cloud Key Management Service (KMS)',
        cost: 1.09,
        date: '2018-10-01T00:00:00Z',
        currency: '"EUR"'
    },
    {
        __typename: 'GoogleBillingResultDTO',
        resourceType: 'Cloud DNS',
        cost: 1.89,
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
                costPerProduct: { billingQuery: mockData, loading: false, error: mockGraphQLError }
            })
        );
        expect(result).toEqual(expectedResult);
    });
});
