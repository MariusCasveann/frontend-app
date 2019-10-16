import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('antd', () => ({ Table: 'Table', Divider: 'Divider', Avatar: 'Avatar', Button: 'Button' }));
jest.mock('antd/lib/table', () => ({ ColumnProps: 'ColumnProps' }));
jest.mock('../../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter', () => 'LoadingOrErrorPresenter');
jest.mock('../../../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card' }));
jest.mock('./../TeamProductOwnerPresenter', () => 'TeamProductOwnerPresenter');
jest.mock('../../../atoms/AdminRoleButton', () => 'AdminRoleButtonu');
jest.mock('../../../../common/molecules/Modals/ConfirmModal', () => 'ConfirmModal');
jest.mock('../../../../createTeam/CreateTeam', () => 'CreateTeam');
jest.mock('../../ProductOwner/EditProductOwner', () => 'EditProductOwner');
jest.mock('../../AddTeamMembers/AddTeamMembers', () => 'AddTeamMembers');

import {
    mockSelectedProduct,
    mockErrorMessage,
    mockTeamByProductId,
    mockCurrentUser,
    mockEmptyTeam,
    mockCurrenUserRole,
    mockFunction,
    mockHistory
} from '../../../../common/mock/MockData';
import TeamMembersPresenter from '../TeamMembersPresenter';
import { getColumns } from '../TeamMembersPresenter';

describe('TeamMembersPresenter', () => {
    describe('when there is value', () => {
        it('renders a Card with teammembers', () => {
            const wrapper = renderer
                .create(
                    <TeamMembersPresenter
                        onAssign={mockFunction}
                        onDelete={mockFunction}
                        onRevoke={mockFunction}
                        teamByProductId={mockTeamByProductId}
                        currentUser={mockCurrentUser}
                        history={{ ...mockHistory, action: 'PUSH' }}
                        loading={false}
                        error={''}
                        selectedProduct={mockSelectedProduct}
                    />
                )
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
    describe('when there is an error', () => {
        it('renders LoadingOrError', () => {
            const wrapper = renderer
                .create(
                    <TeamMembersPresenter
                        onAssign={mockFunction}
                        onDelete={mockFunction}
                        onRevoke={mockFunction}
                        teamByProductId={mockTeamByProductId}
                        currentUser={mockCurrentUser}
                        history={{ ...mockHistory, action: 'PUSH' }}
                        loading={false}
                        error={mockErrorMessage}
                        selectedProduct={mockSelectedProduct}
                    />
                )
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
    describe('when there is loading', () => {
        it('renders LoadingOrError', () => {
            const wrapper = renderer
                .create(
                    <TeamMembersPresenter
                        onAssign={mockFunction}
                        onDelete={mockFunction}
                        onRevoke={mockFunction}
                        teamByProductId={mockTeamByProductId}
                        currentUser={mockCurrentUser}
                        history={{ ...mockHistory, action: 'PUSH' }}
                        loading={true}
                        error={''}
                        selectedProduct={mockSelectedProduct}
                    />
                )
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
    describe('when there is no data', () => {
        it('renders no data', () => {
            const wrapper = renderer
                .create(
                    <TeamMembersPresenter
                        onAssign={mockFunction}
                        onDelete={mockFunction}
                        onRevoke={mockFunction}
                        teamByProductId={mockEmptyTeam}
                        currentUser={mockCurrentUser}
                        loading={false}
                        history={{ ...mockHistory, action: 'PUSH' }}
                        error={''}
                        selectedProduct={mockSelectedProduct}
                    />
                )
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
});
describe('getColumns method', () => {
    it('should return 4', () => {
        const columnLength = getColumns(
            mockFunction,
            mockFunction,
            mockSelectedProduct,
            mockFunction,
            mockFunction,
            mockCurrenUserRole
        );
        expect(columnLength).toHaveLength(4);
    });
});
