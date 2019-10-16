import { createMemoryHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { configureStore } from '../state/Store';
jest.mock('../components/routes/components/Routes', () => () => 'Routes');

it('renders without crashing', () => {
    const div = document.createElement('div');
    const memoryHistory = createMemoryHistory();
    const store = configureStore(memoryHistory);
    ReactDOM.render(<App store={store} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
