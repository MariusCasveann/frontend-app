import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { RootState } from '../../../../state/RootState';
import TeamMembersPresenter, { TeamMemberProps } from './TeamMembersPresenter';
import { QueryAllProducts_allProducts } from '../../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { QueryCurrentUser_currentUser } from '../../../authentication/molecules/UserProfile/graphql/__generated__/QueryCurrentUser';
import { getProductId } from '../../../common/helpers/productHelper';
import { useMutation } from '@apollo/react-hooks';
import { History, LocationState } from 'history';
import { QueryCurrentUser } from '../../../authentication/molecules/UserProfile/graphql/__generated__/QueryCurrentUser';
import { openSuccessNotification, openErrorNotification } from '../../../common/molecules/Notification/Notifications';
import {
    TeamByProductId_teamByProductId_teamMembers,
    TeamByProductId_teamByProductId
} from './graphql/__generated__/TeamByProductId';
import { teamMutationOptions, getNewTeamMembers } from '../../helpers/teamHelper';
import { successMessage, errorMessage } from '../../../../config/constants';

const queryTeamByProductId = loader('./graphql/TeamByProductId.graphql');
const mutationAssignAdminRole = loader('./graphql/TeamMemberAssignAdminRole.graphql');
const mutationRevokeAdminRole = loader('./graphql/TeamMemberRevokeAdminRole.graphql');
const mutationDeleteTeamMember = loader('./../../../createTeam/graphql/updateTeam.graphql');

interface PropsFromState {
    selectedProduct: QueryAllProducts_allProducts;
    currentUser: QueryCurrentUser_currentUser;
}

interface GraphQLProps {
    team: TeamMemberProps;
    currentUser: QueryCurrentUser;
    history: History<LocationState>;
}

export const mapStateToProps = (state: RootState) => ({
    selectedProduct: state.app.products.selectedProduct,
    currentUser: state.app.authentication.currentUser
});

export const handleDelete = async (
    teamByProductId: TeamByProductId_teamByProductId,
    userId: string,
    productId: string,
    deleteTeamMember: (variables: object) => void
) => {
    const newTeamMembers = getNewTeamMembers(teamByProductId, userId);

    try {
        await deleteTeamMember({
            variables: {
                productId,
                team: {
                    id: teamByProductId && teamByProductId.id,
                    productOwner: {
                        id: teamByProductId && teamByProductId.productOwner && teamByProductId.productOwner.id,
                        activated: true
                    },
                    teamMembers:
                        newTeamMembers &&
                        newTeamMembers.map((item: TeamByProductId_teamByProductId_teamMembers | null) => ({
                            id: (item && item.id) || '',
                            activated: true
                        }))
                }
            }
        });
        openSuccessNotification(successMessage, 'The team member is deleted successfully');
    } catch (error) {
        openErrorNotification(errorMessage, 'Deleting team member was not successful!');
    }
};

export const handleAssignAdminRole = async (
    productId: string,
    userId: string,
    assignAdminRole: (variables: object) => void
) => {
    try {
        await assignAdminRole({
            variables: {
                productId,
                userId
            }
        });
        openSuccessNotification(successMessage, 'Assign admin role was successful!');
    } catch (error) {
        openErrorNotification(errorMessage, 'Assign admin role was not successful!');
    }
};

export const handleRevokeAdminRole = async (
    productId: string,
    userId: string,
    revokeAdminRole: (variables: object) => void
) => {
    try {
        await revokeAdminRole({
            variables: {
                productId,
                userId
            }
        });
        openSuccessNotification(successMessage, 'Revoke admin role was successful!');
    } catch (error) {
        openErrorNotification(errorMessage, 'Revoke admin role was not successful!');
    }
};

export const Team = ({
    team: { teamByProductId, loading, error },
    currentUser,
    selectedProduct,
    history
}: PropsFromState & GraphQLProps) => {
    const [assignAdminRole] = useMutation(mutationAssignAdminRole, teamMutationOptions);
    const [revokeAdminRoleMutation] = useMutation(mutationRevokeAdminRole, teamMutationOptions);
    const [deleteTeamMember] = useMutation(mutationDeleteTeamMember, teamMutationOptions);

    useEffect(() => {
        if (teamByProductId === null) {
            history.push('/create-team');
        }
    }, [teamByProductId, history]);

    return (
        <TeamMembersPresenter
            onDelete={(productId = selectedProduct.id, team = teamByProductId, userId) => {
                handleDelete(team, userId, productId, deleteTeamMember);
            }}
            onAssign={async (productId = selectedProduct.id, userId) =>
                handleAssignAdminRole(productId, userId, assignAdminRole)
            }
            onRevoke={async (productId = selectedProduct.id, userId) =>
                handleRevokeAdminRole(productId, userId, revokeAdminRoleMutation)
            }
            selectedProduct={selectedProduct}
            loading={loading}
            error={error}
            history={history}
            teamByProductId={teamByProductId}
            currentUser={currentUser}
        />
    );
};

export default compose(
    connect(mapStateToProps),
    graphql(queryTeamByProductId, {
        name: 'team',
        options: ({ selectedProduct }: PropsFromState) => ({
            variables: {
                productId: getProductId(selectedProduct)
            },
            fetchPolicy: 'no-cache'
        })
    })
)(Team);
