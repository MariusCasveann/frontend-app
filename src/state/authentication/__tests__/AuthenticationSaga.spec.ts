import { getCurrentUser } from '../AuthenticationSaga';
import { AnyAction } from 'redux';
import { runSaga, RunSagaOptions } from 'redux-saga';
import { AuthenticationActionCreators, AuthenticationActionTypes } from '../AuthenticationActions';
import { mockCurrentUser } from '../../../components/common/mock/MockData';
import { createMockedApolloClient } from '../../../utils/test/Mocking';

describe('authentication saga', () => {
    describe('get current user', () => {
        const dispatchedActions: AnyAction[] = [];
        const apolloQueryMock = jest.fn().mockReturnValue(Promise.resolve({ data: mockCurrentUser }));
        const apolloClient = createMockedApolloClient();
        apolloClient.query = apolloQueryMock;

        beforeAll(async () => {
            const sagaOptions: RunSagaOptions<AnyAction, {}> = {
                dispatch: action => dispatchedActions.push(action)
            };

            await runSaga<AnyAction, {}, AnyAction>(
                sagaOptions,
                getCurrentUser(apolloClient),
                AuthenticationActionCreators.loginSuccessful({ currentUser: mockCurrentUser })
            ).done;
        });
        it('should call query once', () => {
            expect(apolloQueryMock).toHaveBeenCalledTimes(1);
        });
        it('should dispatch 1 actions', () => {
            expect(dispatchedActions.length).toBe(1);
        });
        it('should dispatch loginSuccessful', () => {
            expect(dispatchedActions[0].type).toMatch(AuthenticationActionTypes.loginSuccessful);
        });
    });
});
