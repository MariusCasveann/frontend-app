import * as React from 'react';
import renderer from 'react-test-renderer';

jest.doMock('antd', () => ({
    Spin: 'Spin',
    Select: 'Select',
    'Select.Option': 'Select.Option'
}));

import SearchableSelectPresenter from '../SearchableSelectPresenter';
import { mockFunction } from '../../../mock/MockData';

describe('SearchableSelectPresenter', () => {
    it('should return the expected output', () => {
        const wrapper = renderer
            .create(
                <SearchableSelectPresenter
                    data={[{ label: 'user 1', id: 1 }, { label: 'user 2', id: 2 }]}
                    onSearchCallback={mockFunction}
                    loading={false}
                />
            )
            .toJSON();

        expect(wrapper).toMatchSnapshot();
    });
});
