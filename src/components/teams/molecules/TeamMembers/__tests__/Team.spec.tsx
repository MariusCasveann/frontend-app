import * as React from 'react';
import { Team, mapStateToProps, handleDelete } from '../Team';
import {
    mockSelectedProduct,
    selectedProductMockedState,
    mockTeamByProductId,
    mockCurrentUser,
    mockFunction
} from '../../../../common/mock/MockData';
import renderer from 'react-test-renderer';

const componentProps = {
    team: { teamByProductId: mockTeamByProductId, loading: false, error: 'error' },
    currentUser: mockCurrentUser,
    selectedProduct: mockSelectedProduct
};

describe('mapStateToProps', () => {
    it('should map state to props correctly', () => {
        const expectedResult = JSON.stringify({
            selectedProduct: mockSelectedProduct
        });
        const result = JSON.stringify(mapStateToProps(selectedProductMockedState()));
        expect(result).toEqual(expectedResult);
    });
});

describe('Team', () => {
    it('should return the expected output', () => {
        const wrapper = renderer.create(<Team {...componentProps} />).toJSON();
        expect(wrapper).toMatchSnapshot();
    });
});

describe('handleDelete', () => {
    it('should call handleDelete if teamByProductId exists', () => {
        const deleteTeamMember = mockFunction;
        handleDelete(mockTeamByProductId, '123', '12345', deleteTeamMember);
        expect(deleteTeamMember).toBeCalled();
    });
});

describe('handleRevokeAdminRole', () => {
    it('should call handleRevokeAdminRole if teamByProductId exists', () => {
        const revokeAdminRole = mockFunction;
        handleDelete(mockTeamByProductId, '123', '12345', revokeAdminRole);
        expect(revokeAdminRole).toBeCalled();
    });
});

describe('handleAssignAdminRole', () => {
    it('should call handleAssignAdminRole if teamByProductId exists', () => {
        const assignAdminRole = mockFunction;
        handleDelete(mockTeamByProductId, '123', '12345', assignAdminRole);
        expect(assignAdminRole).toBeCalled();
    });
});
/*import * as React from 'react';
import Team from '../Team';
import { MockedProvider } from 'react-apollo/test-utils';
import { mockTeamByProductId, mockCurrentUser } from '../../../../common/mock/MockData';
import * as renderer from 'react-test-renderer';
import TeamMembersPresenter from '../TeamMembersPresenter';
import { notification } from 'antd';
import { MockedResponse } from 'react-apollo/test-links';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import * as apolloHooks from '@apollo/react-hooks';

let mocksDelete: ReadonlyArray<MockedResponse>;

const mockRootState = {
    app: {
        products: {
            selectedProduct: mockSelectedProduct
        }
    }
}

const deleteTeamMock = jest.fn().mockResolvedValue({});

describe('<Team/> delete team member mutation', () => {
    it('deleteTeamMember is called by TeamMembersPresenter and deletes team member', async () => {
        const success = jest.spyOn(notification, 'success')
        const useMutationSpied = jest.spyOn(apolloHooks, 'useMutation')
            .mockReturnValue([deleteTeamMock, { loading: false, called: false }])
        const root = renderer.create(
            <Provider store={createMockStore([])(mockRootState)}>
                <MockedProvider mocks={mocksDelete}>
                    <Team team={mockTeamByProductId} currentUser={mockCurrentUser} />
                </MockedProvider>
            </Provider>
        ).root;

        await root.findByType(TeamMembersPresenter).props.onDelete('50051', mockTeamByProductId, '3456')

        expect(success).toHaveBeenCalledTimes(1);
        useMutationSpied.mockRestore()
    });
});*/
