import { connect } from 'react-redux';

// components
import RoutesPresenter from './RoutesPresenter';

// state
import { RootState } from '../../../state/RootState';

export const mapStateToProps = (state: RootState) => ({
    currentUser: state.app.authentication.currentUser,
    selectedProduct: state.app.products.selectedProduct
});

export default connect(
    mapStateToProps,
    null
)(RoutesPresenter);
