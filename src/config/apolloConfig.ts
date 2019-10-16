import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { config } from '.';
import { DPLocalStorage } from '../state/LocalStorage';

const httpLink = new HttpLink({
    uri: `${config.backend.url}/graphql`,
    credentials: 'same-origin',
    headers: {
        Authorization: `Bearer ${DPLocalStorage.getToken()}`
    }
});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache()
});
