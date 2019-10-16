import { mapStateToProps } from '../DomainRessourcesWidget';
import { QueryBilling_billingQuery } from '../../common/qraphql/__generated__/QueryBilling';
import { mockGraphQLError, createMockedState } from '../../../../common/mock/MockData';

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

describe('mapStateToProps', () => {
    it('should map state to props correctly', () => {
        const expectedResult = JSON.stringify({
            data: mockData,
            loading: false,
            error: mockGraphQLError.message
        });
        const result = JSON.stringify(
            mapStateToProps(createMockedState(), {
                domainRessources: { billingQuery: mockData, loading: false, error: mockGraphQLError }
            })
        );
        expect(result).toEqual(expectedResult);
    });
});
