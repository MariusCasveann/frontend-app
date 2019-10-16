import React from 'react';
import { connect } from 'react-redux';
import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { RootState } from '../../state/RootState';
import LightApplicationsPresenter, { ApplicationsProps } from './LightApplicationsPresenter';
import { QueryAllProducts_allProducts } from '../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { getProductId } from '../common/helpers/productHelper';

const query = loader('./graphql/LightApplicationsOfProduct.graphql');

interface PropsFromState {
    selectedProduct: QueryAllProducts_allProducts;
}

interface GraphQLProps {
    applications: ApplicationsProps;
}

const lightApplications = ({
    applications: { lightApplicationsOfProduct, loading, error }
}: PropsFromState & GraphQLProps) => (
    <LightApplicationsPresenter
        loading={loading}
        error={error}
        lightApplicationsOfProduct={lightApplicationsOfProduct}
    />
);

export const mapStateToProps = (state: RootState) => ({
    selectedProduct: state.app.products.selectedProduct
});

export default compose(
    connect(mapStateToProps),
    graphql(query, {
        name: 'applications',
        options: ({ selectedProduct }: PropsFromState) => ({
            variables: {
                productId: getProductId(selectedProduct)
            }
        })
    })
)(lightApplications);
