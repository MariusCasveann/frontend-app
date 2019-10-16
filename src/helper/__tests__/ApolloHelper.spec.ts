import { ApolloHelper, OperationType } from '../ApolloHelper';
import { createOperationMock } from '../apollo';

describe('getOperationType', () => {
    it('should return the operation type from an GQL Operation', () => {
        const operationType = OperationType.Query;
        const operation = createOperationMock('TestQuery', operationType);
        const result = ApolloHelper.getOperationType(operation);
        expect(result).toBe(operationType);
    });
});

describe('isQuery', () => {
    it('should return true when operation was a query', () => {
        const operationType = OperationType.Query;
        const operation = createOperationMock('TestQuery', operationType);
        const result = ApolloHelper.isQuery(operation);
        expect(result).toBeTruthy();
    });

    it('should return false when operation was not a query', () => {
        const operationType = OperationType.Mutation;
        const operation = createOperationMock('TestMuh', operationType);
        const result = ApolloHelper.isQuery(operation);
        expect(result).toBeFalsy();
    });
});
