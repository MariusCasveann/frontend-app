import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { GraphQLError } from 'graphql';
import { RootState } from '../../../../state/RootState';
import DomainSelectionPresenter from './DomainSelectionPresenter';
import { QueryAllDomains_allDomains } from './graphql/__generated__/QueryAllDomains';

const query = loader('./graphql/QueryAllDomains.graphql');

interface DomainSelectionProps {
    data: GraphQLProps;
}

interface GraphQLProps {
    loading: boolean;
    error: GraphQLError;
    allDomains: QueryAllDomains_allDomains[];
}

const mapStateToProps = (state: RootState, { data: { allDomains, loading, error } }: DomainSelectionProps) => ({
    data: allDomains,
    loading,
    error: error && error.message
});

export default compose(
    graphql(query),
    connect(mapStateToProps)
)(DomainSelectionPresenter);
