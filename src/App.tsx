import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import './App.css';
import { apolloClient } from './config/apolloConfig';
import Routes from './components/routes/components/Routes';

export interface AppProps {
    store: Store;
}

class App extends Component<AppProps> {
    public render() {
        return (
            <div className="backoffice-shared-components">
                <Provider store={this.props.store}>
                    <ApolloProvider client={apolloClient}>
                        <Routes />
                    </ApolloProvider>
                </Provider>
            </div>
        );
    }
}

export default App;
