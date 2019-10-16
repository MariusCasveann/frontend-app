import React, { useState, useEffect, FormEvent } from 'react';

import { Form, notification } from 'antd';
import { loader } from 'graphql.macro';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { apolloClient } from '../../../../config/apolloConfig';
import { prepareOptions } from '../../../createTeam/helpers/teamHelper';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { QueryAllProducts_allProducts } from '../../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { TeamByProductId_teamByProductId } from '../TeamMembers/graphql/__generated__/TeamByProductId';
import EditProductOwnerPresenter from './EditProductOwnerPresenter';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';

import '../TeamModal.css';

const queryGetAllUsers = loader('./../../../users/graphql/getAllUsers.graphql');
const mutationUpdateTeam = loader('./../../../createTeam/graphql/updateTeam.graphql');

export interface EditProductOwnerProps {
    selectedProduct: QueryAllProducts_allProducts;
    teamByProductId: TeamByProductId_teamByProductId;
    form: WrappedFormUtils;
    changeProductOwner: boolean;
    setChangeProductOwner: (flag: boolean) => void;
}

export const handleSubmit = (props: EditProductOwnerProps, updateTeamMutation: (variables: object) => void) => (
    e: FormEvent
) => {
    const { form, teamByProductId, selectedProduct, setChangeProductOwner } = props;
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
                    id: team.productOwner,
                    activated: true
                },
                teamMembers:
                    teamByProductId &&
                    teamByProductId.teamMembers &&
                    teamByProductId.teamMembers.map(item => ({ id: item && item.id, activated: true }))
            }
        }
    });
    setChangeProductOwner(false);
};

export const ProductOwner = (props: EditProductOwnerProps) => {
    const { form, teamByProductId, changeProductOwner, setChangeProductOwner } = props;
    const [searchProductOwnerInput, setSearchProductOwnerInput] = useState<string>('');

    const [updateTeamMutation, { data: teamAfterUpdate, error: updateTeamError }] = useMutation(mutationUpdateTeam, {
        client: apolloClient,
        fetchPolicy: 'no-cache',
        refetchQueries: ['TeamByProductId']
    });

    const { loading: loadingProductOwner, data: dataForProductOwner } = useQuery(queryGetAllUsers, {
        variables: { search: searchProductOwnerInput },
        client: apolloClient
    });

    const productOwnerOptions = prepareOptions(dataForProductOwner);

    useEffect(() => {
        if (updateTeamError) {
            notification.error({ message: updateTeamError.message });
        }

        if (teamAfterUpdate) {
            notification.success({ message: 'Product owner updated successfully' });
        }
    }, [teamAfterUpdate, updateTeamError]);

    return (
        <EditProductOwnerPresenter
            getFieldDecorator={form.getFieldDecorator}
            team={teamByProductId}
            changeProductOwner={changeProductOwner}
            setChangeProductOwner={setChangeProductOwner}
            handleSubmit={handleSubmit(props, updateTeamMutation)}
            productOwnerOptions={productOwnerOptions}
            loadingProductOwner={loadingProductOwner}
            setSearchProductOwnerInput={setSearchProductOwnerInput}
        />
    );
};

const FormTeamPresenter = Form.create({ name: 'team' })(ProductOwner);

export default compose(connect(null))(FormTeamPresenter);
