import React from 'react';
import renderer from 'react-test-renderer';
import { mapStateToProps, Team, handleSubmit } from '../CreateTeam';
import {
    mockForm,
    mockFunction,
    mockGraphQLError,
    mockHistory,
    mockSelectedProduct,
    mockTeamByProductId,
    selectedProductMockedState
} from '../../common/mock/MockData';

const componentProps = {
    history: { ...mockHistory, action: 'PUSH' },
    team: { teamByProductId: mockTeamByProductId, loading: false, error: 'error' },
    form: {
        ...mockForm,
        getFieldsValue: () => ({ teamMembers: [1, 2] }),
        getFieldsError: () => ({})
    },
    data: { allUsers: [] },
    loading: false,
    error: mockGraphQLError,
    selectedProduct: mockSelectedProduct
};

describe('mapStateToProps', () => {
    it('should map state to props correctly', () => {
        const expectedResult = JSON.stringify({
            selectedProduct: mockSelectedProduct
        });
        const result = JSON.stringify(mapStateToProps(selectedProductMockedState()));

        expect(result).toEqual(expectedResult);
    });
});

describe('Team', () => {
    it('should return the expected output', () => {
        const wrapper = renderer
            .create(<Team {...componentProps} history={{ ...mockHistory, action: 'REPLACE' }} />)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });
});

describe('handleSubmit', () => {
    it('should call createTeamMutation', () => {
        const createTeamMutation = mockFunction;
        handleSubmit(
            {
                ...componentProps,
                team: { ...componentProps.team, teamByProductId: null },
                history: { ...mockHistory, action: 'PUSH' }
            },
            createTeamMutation
        )({ preventDefault: mockFunction });
        expect(createTeamMutation).toBeCalled();
    });
});
