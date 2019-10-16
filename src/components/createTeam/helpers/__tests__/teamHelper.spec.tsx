import { getTeamFormRules, prepareOptions } from '../teamHelper';
import { mockCurrentUser } from '../../../common/mock/MockData';
import { TeamData } from '../../CreateTeam';

describe('teamHelper', () => {
    it('getTeamFormRules should return the expected object', () => {
        expect(getTeamFormRules()).toEqual({
            productOwner: [
                {
                    required: true,
                    message: 'Please select a product owner'
                }
            ],
            teamMembers: [
                {
                    required: true,
                    message: 'Please select at least one team member'
                }
            ]
        });
    });

    it('prepareOptions should return the expected array', () => {
        const data: TeamData = {
            allUsers: [{ ...mockCurrentUser }, { ...mockCurrentUser, firstName: 'user 2', id: 2 }]
        };

        const expectedData = [{ label: 'Test Test', id: 49050 }, { label: 'user 2 Test', id: 2 }];

        expect(prepareOptions(data)).toEqual(expectedData);
    });

    it('prepareOptions should return the expected array if firstName is missing', () => {
        const data: TeamData = {
            allUsers: [{ ...mockCurrentUser }, { ...mockCurrentUser, firstName: null, login: 'username', id: 2 }]
        };

        const expectedData = [{ label: 'Test Test', id: 49050 }, { label: 'null Test', id: 2 }];

        expect(prepareOptions(data)).toEqual(expectedData);
    });

    it('prepareOptions should return an empty array if allUsers is missing', () => {
        const data: TeamData = { allUsers: [] };

        expect(prepareOptions(data)).toEqual([]);
    });
});
