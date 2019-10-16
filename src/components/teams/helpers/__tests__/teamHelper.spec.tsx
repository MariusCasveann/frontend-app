import { checkIfCurrentUserIsAdmin, checkIfMemberIsAdmin, getNewTeamMembers } from './../teamHelper';
import {
    mockSelectedProduct,
    mockCurrentUser,
    mockTeamMember,
    mockCurrenUserRole,
    mockTeamByProductId
} from '../../../common/mock/MockData';

const mockTeamMemberIsAdmin = {
    __typename: 'Role',
    name: 'a-admin'
};

const mockResult = [
    {
        __typename: 'User',
        email: 'test1@mediamarktsaturn.com',
        firstName: 'Test',
        id: '1234',
        lastName: 'Test2',
        roles: [
            {
                name: 'WRITE_ALL',
                __typename: 'Role'
            },
            {
                name: 'a-admin',
                __typename: 'Role'
            }
        ]
    }
];

describe('Team helper', () => {
    it('check if currentUser is admin', () => {
        const currentUserIsAdmin = expect(checkIfCurrentUserIsAdmin(mockCurrentUser, mockSelectedProduct));
        currentUserIsAdmin.toEqual(mockCurrenUserRole);
    });
    it('check if team member is admin', () => {
        const teamMemberIsAdmin = expect(checkIfMemberIsAdmin(mockTeamMember, mockSelectedProduct));
        teamMemberIsAdmin.toEqual(mockTeamMemberIsAdmin);
    });
    it('get new team members', () => {
        const teamMemberIsAdmin = expect(getNewTeamMembers(mockTeamByProductId, '2234'));
        teamMemberIsAdmin.toEqual(mockResult);
    });
});
