import { loader } from 'graphql.macro';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { Dispatch } from 'redux';

// interfaces
import {
    QueryAllProducts,
    QueryAllProducts_allProducts
} from '../../../dashboard/atoms/ProductSelection/graphql/__generated__/QueryAllProducts';

// redux
import { RootState } from '../../../../state/RootState';
import { ProductsActionCreators } from '../../../../state/products/ProductsActions';

// components
import SelectedProductPresenter from './SelectedProductPresenter';

const query = loader('../../../dashboard/atoms/ProductSelection/graphql/QueryAllProducts.graphql');

interface SelectedProductProps {
    data: QueryAllProducts;
    showSelect: boolean;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSelectedProduct: (selectedProduct: QueryAllProducts_allProducts) => {
        dispatch(ProductsActionCreators.setSelectedProduct({ selectedProduct }));
    }
});

const mapStateToProps = (state: RootState, ownProps: SelectedProductProps) => ({
    allProducts: ownProps.data.allProducts,
    showSelect: ownProps.showSelect,
    selectedProduct: state.app.products.selectedProduct
});

export default compose(
    graphql(query),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(SelectedProductPresenter);
