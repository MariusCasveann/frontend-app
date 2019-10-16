import React, { useState, useEffect, FormEvent } from 'react';

import { Form, notification } from 'antd';
import { loader } from 'graphql.macro';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { apolloClient } from '../../../../config/apolloConfig';
import { prepareOptions } from '../../../createTeam/helpers/teamHelper';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { QueryAllProducts_allProducts } from '../../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { TeamByProductId_teamByProductId } from '../TeamMembers/graphql/__generated__/TeamByProductId';
import AddTeamMembersPresenter from './AddTeamMembersPresenter';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';

const queryGetAllUsers = loader('./../../../users/graphql/getAllUsers.graphql');
const mutationUpdateTeam = loader('./../../../createTeam/graphql/updateTeam.graphql');

export interface AddTeamMembersProps {
    selectedProduct: QueryAllProducts_allProducts;
    teamByProductId: TeamByProductId_teamByProductId;
    form: WrappedFormUtils;
    addTeamMembers: boolean;
    setAddTeamMembers: (flag: boolean) => void;
}

export const handleSubmit = (props: AddTeamMembersProps, updateTeamMutation: (variables: object) => void) => (
    e: FormEvent
) => {
    const { form, teamByProductId, selectedProduct, setAddTeamMembers } = props;
    const team = form.getFieldsValue();

    e.preventDefault();
    form.validateFields();
    const validationErrors = Object.values(form.getFieldsError());
    if (validationErrors.some(element => element !== undefined)) {
        return;
    }

    updateTeamMutation({
        variables: {
            productId: selectedProduct.id,
            team: {
                id: teamByProductId.id,
                productOwner: {
                    id: teamByProductId && teamByProductId.productOwner && teamByProductId.productOwner.id,
                    activated: true
                },
                teamMembers: team.teamMembers.map((item: string) => ({ id: item, activated: true }))
            }
        }
    });
    setAddTeamMembers(false);
};

export const TeamMembers = (props: AddTeamMembersProps) => {
    const { selectedProduct, form, teamByProductId, addTeamMembers, setAddTeamMembers } = props;
    const [searchTeamMembersInput, setSearchTeamMembersInput] = useState<string>('');

    const [updateTeamMutation, { data: teamAfterUpdate, error: updateTeamError }] = useMutation(mutationUpdateTeam, {
        client: apolloClient,
        fetchPolicy: 'no-cache',
        refetchQueries: ['TeamByProductId']
    });

    const { loading: loadingTeamMembers, data: dataForTeamMembers } = useQuery(queryGetAllUsers, {
        variables: { search: searchTeamMembersInput },
        client: apolloClient
    });

    const teamMembersOptions = prepareOptions(dataForTeamMembers);

    useEffect(() => {
        if (updateTeamError) {
            notification.error({ message: updateTeamError.message });
        }

        if (teamAfterUpdate) {
            notification.success({ message: 'Team members updated successfully' });
        }
    }, [teamAfterUpdate, updateTeamError, selectedProduct]);

    return (
        <AddTeamMembersPresenter
            getFieldDecorator={form.getFieldDecorator}
            addTeamMembers={addTeamMembers}
            setAddTeamMembers={setAddTeamMembers}
            handleSubmit={handleSubmit(props, updateTeamMutation)}
            team={teamByProductId}
            teamMembersOptions={teamMembersOptions}
            loadingTeamMembers={loadingTeamMembers}
            setSearchTeamMembersInput={setSearchTeamMembersInput}
        />
    );
};
const AddMembers = Form.create({ name: 'team' })(TeamMembers);
export default compose(
    connect(
        null,
        null
    )
)(AddMembers);
