import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

jest.doMock('antd', () => ({ Form: 'Form', 'Form.Item': 'Form.Item' }));
jest.doMock('../../../../common/molecules/SearchableSelect/SearchableSelectPresenter', () => ({
    SearchableSelectPresenter: 'SearchableSelectPresenter'
}));

// tslint:disable-next-line:no-any
const _ShallowRenderer: any = ShallowRenderer;
const renderer = new _ShallowRenderer();

import AddTeamMembersPresenter from '../AddTeamMembersPresenter';
import { mockForm, mockFunction, mockSelectData, mockTeamByProductId } from '../../../../common/mock/MockData';

describe('AddTeamMembersPresenter', () => {
    it('should return the expected output when addTeamMembers is true', () => {
        const tree = renderer.render(
            <AddTeamMembersPresenter
                getFieldDecorator={mockForm.getFieldDecorator}
                team={mockTeamByProductId}
                teamMembersOptions={mockSelectData}
                addTeamMembers={true}
                setAddTeamMembers={mockFunction}
                handleSubmit={mockFunction}
                loadingTeamMembers={false}
                setSearchTeamMembersInput={mockFunction}
            />
        );
        expect(tree).toMatchSnapshot();
    });

    it('should return the expected output when addTeamMembers is false', () => {
        const tree = renderer.render(
            <AddTeamMembersPresenter
                getFieldDecorator={mockForm.getFieldDecorator}
                team={mockTeamByProductId}
                teamMembersOptions={mockSelectData}
                addTeamMembers={false}
                setAddTeamMembers={mockFunction}
                handleSubmit={mockFunction}
                loadingTeamMembers={false}
                setSearchTeamMembersInput={mockFunction}
            />
        );
        expect(tree).toMatchSnapshot();
    });
});
