import React, { FormEvent, useState, useEffect } from 'react';

import { compose, graphql } from 'react-apollo';
import { Form, notification } from 'antd';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';

import './team.css';
import { RootState } from '../../state/RootState';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { apolloClient } from '../../config/apolloConfig';
import CreateTeamPresenter from './CreateTeamPresenter';
import { prepareOptions } from './helpers/teamHelper';
import { GraphQLError } from 'graphql';
import { getAllUsers, getAllUsers_allUsers } from '../users/graphql/__generated__/getAllUsers';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { QueryAllProducts_allProducts } from '../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { getProductId } from '../common/helpers/productHelper';
import { History, LocationState } from 'history';
import { TeamByProductId_teamByProductId } from '../teams/molecules/TeamMembers/graphql/__generated__/TeamByProductId';

const queryGetAllUsers = loader('./../users/graphql/getAllUsers.graphql');
const mutationCreateTeam = loader('./graphql/createTeam.graphql');
const queryTeamByProductId = loader('./../teams/molecules/TeamMembers/graphql/TeamByProductId.graphql');

export interface TeamData {
    allUsers: getAllUsers_allUsers[] | undefined;
}

export interface TeamProps {
    teamByProductId: TeamByProductId_teamByProductId | null;
    loading: boolean;
    error: string;
}

interface GraphQLProps {
    history: History<LocationState>;
    team: TeamProps;
    form: WrappedFormUtils;
    data: getAllUsers;
    loading: boolean;
    error: GraphQLError;
    selectedProduct: QueryAllProducts_allProducts;
}

export const handleSubmit = (props: GraphQLProps, createTeamMutation: (variables: object) => void) => (
    e: FormEvent<HTMLFormElement>
) => {
    const {
        form,
        selectedProduct,
        team: { teamByProductId }
    } = props;
    const team = form.getFieldsValue();

    props.form.validateFields();
    e.preventDefault();
    const validationErrors = Object.values(form.getFieldsError());
    if (validationErrors.some(element => element !== undefined)) {
        return;
    }

    if (!teamByProductId) {
        createTeamMutation({
            variables: {
                productId: selectedProduct.id,
                team: {
                    productOwner: {
                        id: team.productOwner,
                        activated: true
                    },
                    teamMembers: team.teamMembers.map((item: string) => ({ id: item, activated: true }))
                }
            }
        });
    }
};

export const Team = (props: GraphQLProps) => {
    const { form, history, team } = props;
    const [searchProductOwnerInput, setSearchProductOwnerInput] = useState<string>('');
    const [searchTeamMembersInput, setSearchTeamMembersInput] = useState<string>('');
    const [createTeamMutation, { data: teamAfterCreate, error: createTeamError }] = useMutation(mutationCreateTeam, {
        client: apolloClient,
        fetchPolicy: 'no-cache'
    });

    const { loading: loadingProductOwner, data: dataForProductOwner } = useQuery(queryGetAllUsers, {
        variables: { search: searchProductOwnerInput },
        client: apolloClient
    });

    const { loading: loadingTeamMembers, data: dataForTeamMembers } = useQuery(queryGetAllUsers, {
        variables: { search: searchTeamMembersInput },
        client: apolloClient
    });

    const productOwnerOptions = prepareOptions(dataForProductOwner);
    const teamMembersOptions = prepareOptions(dataForTeamMembers);

    useEffect(() => {
        if (createTeamError) {
            notification.error({ message: createTeamError.message });
        }

        if ((team && team.teamByProductId) || teamAfterCreate) {
            history.push('/team');
        }
    }, [createTeamError, teamAfterCreate, history, team]);

    return (
        <CreateTeamPresenter
            handleSubmit={handleSubmit(props, createTeamMutation)}
            team={team && team.teamByProductId}
            teamMembersOptions={teamMembersOptions}
            loadingProductOwner={loadingProductOwner}
            productOwnerOptions={productOwnerOptions}
            loadingTeamMembers={loadingTeamMembers}
            setSearchProductOwnerInput={setSearchProductOwnerInput}
            setSearchTeamMembersInput={setSearchTeamMembersInput}
            form={form}
        />
    );
};

const FormTeamPresenter = Form.create({ name: 'team' })(Team);

export const mapStateToProps = (state: RootState) => ({
    selectedProduct: state.app.products.selectedProduct
});

export default compose(
    connect(mapStateToProps),
    graphql(queryTeamByProductId, {
        name: 'team',
        options: ({ selectedProduct }: GraphQLProps) => ({
            variables: {
                productId: getProductId(selectedProduct)
            },
            fetchPolicy: 'no-cache'
        })
    })
)(FormTeamPresenter);
