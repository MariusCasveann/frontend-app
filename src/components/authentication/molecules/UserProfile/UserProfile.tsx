import { connect } from 'react-redux';
import { RootState } from '../../../../state/RootState';
import UserProfilePresenter from './UserProfilePresenter';

export const mapStateToProps = (state: RootState) => ({
    currentUser: state.app.authentication.currentUser
});

export default connect(mapStateToProps)(UserProfilePresenter);
