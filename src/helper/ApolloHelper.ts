import { Operation } from 'apollo-link';
import { OperationDefinitionNode } from 'graphql';

export enum OperationType {
    Mutation = 'mutation',
    Query = 'query',
    Unknown = 'unknown'
}

export class ApolloHelper {
    /**
     * Returns the operation type from an GQL Operation
     * @param operation
     */
    public static getOperationType = (operation: Operation): OperationType => {
        const operationType = (operation.query.definitions[0] as OperationDefinitionNode).operation;
        const potentialMatch = Object.entries(OperationType).find(([key, value]) => value === operationType);

        return !!potentialMatch ? OperationType[potentialMatch[0]] : OperationType.Unknown;
    };

    /**
     * Checks if passed operation is a Query
     * @param operation
     */
    public static isQuery = (operation: Operation): boolean =>
        ApolloHelper.getOperationType(operation) === OperationType.Query;
}
