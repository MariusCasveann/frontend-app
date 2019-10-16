import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { TeamMembers, handleSubmit } from '../AddTeamMembers';
import { mockForm, mockFunction, mockSelectedProduct, mockTeamByProductId } from '../../../../common/mock/MockData';

const componentProps = {
    teamByProductId: mockTeamByProductId,
    form: {
        ...mockForm,
        getFieldsValue: () => ({ teamMembers: [1, 2] }),
        getFieldsError: () => ({})
    },
    addTeamMembers: true,
    setAddTeamMembers: mockFunction,
    selectedProduct: mockSelectedProduct
};

// tslint:disable-next-line:no-any
const _ShallowRenderer: any = ShallowRenderer;
const renderer = new _ShallowRenderer();

describe('TeamMembers', () => {
    it('should return the expected output', () => {
        const tree = renderer.render(
            <TeamMembers
                selectedProduct={mockSelectedProduct}
                teamByProductId={mockTeamByProductId}
                form={mockForm}
                addTeamMembers={true}
                setAddTeamMembers={mockFunction}
            />
        );

        expect(tree).toMatchSnapshot();
    });

    it('handleSubmit should call updateTeamMutation', () => {
        const updateTeamMutation = mockFunction;
        handleSubmit(
            {
                ...componentProps
            },
            updateTeamMutation
        )({ preventDefault: mockFunction });
        expect(updateTeamMutation).toBeCalled();
    });
});
