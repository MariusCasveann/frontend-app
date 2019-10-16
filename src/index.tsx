import { createHashHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { AuthenticationActionCreators } from './state/authentication/AuthenticationActions';
import { configureStore } from './state/Store';

const history = createHashHistory();
const store = configureStore(history);

// Workaround for now to get the session token inside the redux store
// This is an exception and will be removed once we build the login functionality
// Please do not dispatch actions from inside the components elsewhere
store.dispatch(AuthenticationActionCreators.login());

ReactDOM.render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
