import React from 'react';
import renderer from 'react-test-renderer';

jest.doMock('antd', () => ({
    Button: 'Button',
    Col: 'Col',
    Form: 'Form',
    Row: 'Row'
}));

jest.mock('../../common/molecules/SearchableSelect/SearchableSelectPresenter', () => 'SearchableSelectPresenter');

import CreateTeamPresenter from '../CreateTeamPresenter';
import { mockEmptyTeam, mockForm, mockFunction } from '../../common/mock/MockData';

describe('CreateTeamPresenter', () => {
    it('renders a card with the team needed fields', () => {
        const mockData = [
            {
                id: 351952,
                label: 'Test test'
            },
            {
                id: 80503,
                label: 'Test1 test1'
            },
            {
                id: 412605,
                label: 'Test2 test2'
            }
        ];
        const wrapper = renderer
            .create(
                <CreateTeamPresenter
                    handleSubmit={mockFunction}
                    teamMembersOptions={mockData}
                    productOwnerOptions={mockData}
                    setSearchProductOwnerInput={mockFunction}
                    setSearchTeamMembersInput={mockFunction}
                    form={mockForm}
                    loadingTeamMembers={false}
                    loadingProductOwner={false}
                    team={mockEmptyTeam}
                />
            )
            .toJSON();

        expect(wrapper).toMatchSnapshot();
    });
});
