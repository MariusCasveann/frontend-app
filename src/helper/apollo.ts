import { OperationType } from './ApolloHelper';
import { Operation } from 'apollo-link';

/**
 * Create an operation Mock with a custom operationName and a specific operationType
 * @param operationName
 * @param operationType
 */
export const createOperationMock = <T = {}>(
    operationName: string,
    operationType: OperationType,
    context?: T
): Operation => ({
    query: {
        kind: 'Document',
        definitions: [
            {
                kind: 'OperationDefinition',
                operation: operationType === OperationType.Unknown ? OperationType.Query : operationType,
                selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                        {
                            kind: 'Field',
                            name: {
                                kind: 'Name',
                                value: 'something'
                            }
                        }
                    ]
                }
            }
        ]
    },
    variables: {},
    operationName,
    extensions: {},
    setContext: jest.fn(),
    getContext: jest.fn().mockReturnValue(context || {}),
    toKey: jest.fn()
});
