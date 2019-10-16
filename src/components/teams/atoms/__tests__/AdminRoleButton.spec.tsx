import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('antd', () => ({ Button: 'Button' }));
import AdminRoleButton from './../AdminRoleButton';
import { TeamByProductId_teamByProductId_teamMembers_roles } from '../../molecules/TeamMembers/graphql/__generated__/TeamByProductId';

const mockMemberHasAdminRole: TeamByProductId_teamByProductId_teamMembers_roles = {
    name: 'a-admin',
    __typename: 'Role'
};

describe('AdminRoleButton', () => {
    describe('when team memeber is admin', () => {
        it('renders revoke right button', () => {
            const wrapper = renderer.create(<AdminRoleButton isTeamMemberAdmin={mockMemberHasAdminRole} />).toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
    describe('when team memeber is not an admin', () => {
        it('renders assign right button', () => {
            const wrapper = renderer.create(<AdminRoleButton isTeamMemberAdmin={undefined} />).toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
});
