import { connect } from 'react-redux';
import { RootState } from '../../../../state/RootState';
import UserMenuPresenter from './UserMenuPresenter';

export const mapStateToProps = (state: RootState) => ({
    currentUser: state.app.authentication.currentUser
});

export default connect(mapStateToProps)(UserMenuPresenter);
