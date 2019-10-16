import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DPLocalStorage } from '../../../../state/LocalStorage';
import FakeAuthPresenter from './FakeAuthPresenter';

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSubmit: (token: string) => {
        DPLocalStorage.setToken(token);
        window.location.href = '/dashboard';
    }
});

export default connect(
    undefined,
    mapDispatchToProps
)(FakeAuthPresenter);
