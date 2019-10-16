import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient, ApolloQueryResult } from 'apollo-client';
import { SchemaLink } from 'apollo-link-schema';
import { addMockFunctionsToSchema } from 'graphql-tools';
import { buildClientSchema } from 'graphql/utilities';
import * as schemaJson from '../../model/graphql/schema.json';
import { createBrowserHistory } from 'history';
import { compose } from 'react-apollo';
import { MockedResponse } from 'react-apollo/test-utils';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { appReducer } from '../../state/AppReducer';

export enum OperationType {
    MUTATION = 'mutate'
}

export interface MockResolver<T> {
    type: OperationType;
    response: T;
    name: string;
}

export interface GQLOpertion<T> {
    type: OperationType;
    operation: () => Promise<ApolloQueryResult<T>>;
}

interface MockedLocation extends Location {
    assign: jest.Mock;
    reload: jest.Mock;
    replace: jest.Mock;
}

interface MockedWindow extends Window {
    location: MockedLocation;
}

/**
 * For every string passed as an argument, this function creates an object with those strings as key and value.
 *
 * Example:
 * <pre><code>
 *     createSimpleMockFactoryResult('Router') = {Router: 'Router'}
 * </code></pre>
 *
 * @param {string} properties
 * @return {{}}
 */
export const createSimpleMockFactoryResult: (...properties: string[]) => { [key: string]: string } = (
    ...properties
) => {
    const result = {};
    properties.forEach(value => (result[value] = value));
    return result;
};

/**
 * Util function, which creates the redux store
 * @param {{}} defaultState
 * @param {MockedResponse[]} mockedResponses mocked Repsonses that should be avaiable
 */
export const createMockedStore = (defaultState = {}, ...mockedResponses: MockedResponse[]) => {
    const history = createBrowserHistory();

    const reduxMiddleware = [
        routerMiddleware(history)
        /* logger */
    ];

    const mockStore = createStore(
        combineReducers({
            app: appReducer,
            router: routerReducer
        }),
        defaultState,
        compose(applyMiddleware(...reduxMiddleware))
    );

    return mockStore;
};

/**
 * Util function, which creates a mocked mutable window
 * @param win
 * @param href
 */
export const createMockedWindow = (win: Window = window, href: string = win.location.href): MockedWindow => {
    let locationMocks: Partial<MockedLocation>;
    const replaceLocation = (url: string): MockedWindow => {
        delete win.location;
        // tslint:disable-next-line:no-any
        win.location = Object.assign(new URL(url), locationMocks) as any;
        return win as MockedWindow;
    };
    locationMocks = {
        assign: jest.fn().mockImplementation(replaceLocation),
        reload: jest.fn(),
        replace: jest.fn().mockImplementation(replaceLocation)
    };
    const windowsMock = replaceLocation(href);
    Object.defineProperty(window.location, 'href', { writable: true, value: window.location.href });
    return windowsMock;
};

const createMockSchemaLink = <T>(...mockResolvers: Array<MockResolver<T>>): SchemaLink => {
    const schema = buildClientSchema(schemaJson as any);
    const queryResolvers = {};
    const mutationResolvers = {};
    for (const mockResolver of mockResolvers) {
        if (mockResolver.type === OperationType.MUTATION) {
            mutationResolvers[mockResolver.name] = () => mockResolver.response;
        } else {
            queryResolvers[mockResolver.name] = () => mockResolver.response;
        }
    }

    const mocks = {
        Query: () => queryResolvers,
        Mutation: () => mutationResolvers
    };

    addMockFunctionsToSchema({ mocks, schema });
    return new SchemaLink({ schema });
};

export const createMockedApolloClient = <T>(operation?: GQLOpertion<T>, ...mockResolvers: Array<MockResolver<T>>) => {
    const mockedApolloClient = new ApolloClient<NormalizedCacheObject>({
        link: createMockSchemaLink(...mockResolvers),
        cache: new InMemoryCache()
    });

    if (operation) {
        mockedApolloClient[operation.type.toString()] = operation.operation;
    }
    return mockedApolloClient;
};
