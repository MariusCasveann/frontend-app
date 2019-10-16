import {
    TeamByProductId_teamByProductId,
    TeamByProductId_teamByProductId_teamMembers,
    TeamByProductId_teamByProductId_teamMembers_roles
} from '../molecules/TeamMembers/graphql/__generated__/TeamByProductId';
import { QueryAllProducts_allProducts } from '../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { QueryCurrentUser_currentUser } from '../../authentication/molecules/UserProfile/graphql/__generated__/QueryCurrentUser';
import { MutationHookOptions } from '@apollo/react-hooks';
import { apolloClient } from '../../../config/apolloConfig';

export const teamMutationOptions: MutationHookOptions = {
    client: apolloClient,
    fetchPolicy: 'no-cache',
    refetchQueries: ['TeamByProductId']
};

export const getNewTeamMembers = (team: TeamByProductId_teamByProductId, userId: string) =>
    team && team.teamMembers && team.teamMembers.filter(teamMember => teamMember && teamMember.id !== userId);

export const checkIfTeamHasData = (teamByProductId: TeamByProductId_teamByProductId) =>
    teamByProductId &&
    teamByProductId.teamMembers &&
    teamByProductId.teamMembers.length &&
    teamByProductId.productOwner;

export const checkIfMemberIsAdmin = (
    item: TeamByProductId_teamByProductId_teamMembers,
    selectedProduct: QueryAllProducts_allProducts
) =>
    item &&
    item.roles &&
    item.roles.find((role: TeamByProductId_teamByProductId_teamMembers_roles | null) =>
        Boolean(role && role.name && role.name.includes(`${selectedProduct.name}-admin`))
    );

export const checkIfCurrentUserIsAdmin = (
    currentUser: QueryCurrentUser_currentUser | null,
    selectedProduct: QueryAllProducts_allProducts
) =>
    currentUser &&
    currentUser.roles &&
    currentUser.roles.find(
        role =>
            Boolean(role && role.name && role.name === `${selectedProduct.name}-admin`) ||
            Boolean(role && role.name && role.name === 'DP God')
    );

export const modalLayout = {
    wrapperCol: { span: 24 }
};
