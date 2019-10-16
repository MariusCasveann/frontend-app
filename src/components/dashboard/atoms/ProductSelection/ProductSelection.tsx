import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { GraphQLError } from 'graphql';
import ProductSelectionPresenter from './ProductSelectionPresenter';
import { RootState } from '../../../../state/RootState';
import { QueryAllProducts_allProducts } from './graphql/__generated__/QueryAllProducts';

const query = loader('./graphql/QueryAllProducts.graphql');

interface ProductSelectionProps {
    data: GraphQLProps;
}

interface GraphQLProps {
    loading: boolean;
    error: GraphQLError;
    allProducts: QueryAllProducts_allProducts[];
}

const mapStateToProps = (state: RootState, { data: { allProducts, loading, error } }: ProductSelectionProps) => ({
    data: allProducts,
    loading,
    error: error && error.message
});

export default compose(
    graphql(query),
    connect(mapStateToProps)
)(ProductSelectionPresenter);
