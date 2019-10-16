import * as React from 'react';
import renderer from 'react-test-renderer';
jest.doMock('antd', () => ({ Select: 'Select', Option: 'Option' }));
import DomainSelectionPresenter from '../DomainSelectionPresenter';
import { QueryAllDomains_allDomains } from '../graphql/__generated__/QueryAllDomains';
import { mockSelectedDomain, mockFunction } from './../../../../common/mock/MockData';

const mockData: QueryAllDomains_allDomains[] = [
    { id: 102, name: 'Engineering Platform', __typename: 'Domain' },
    { id: 103, name: 'Customer Attraction', __typename: 'Domain' }
];

describe('DomainSelectionPresenter', () => {
    it('renders correctly with mock data', () => {
        const tree = renderer
            .create(
                <DomainSelectionPresenter
                    onDomainSelected={mockFunction}
                    error={undefined}
                    loading={false}
                    selectedDomain={mockSelectedDomain}
                    data={mockData}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders correctly without mock data', () => {
        const tree = renderer
            .create(
                <DomainSelectionPresenter
                    onDomainSelected={mockFunction}
                    error={undefined}
                    loading={true}
                    data={undefined}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders with error', () => {
        const tree = renderer
            .create(
                <DomainSelectionPresenter
                    onDomainSelected={mockFunction}
                    error={'Error'}
                    loading={false}
                    data={undefined}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
