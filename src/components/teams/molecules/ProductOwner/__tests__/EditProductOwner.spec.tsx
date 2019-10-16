import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { mockForm, mockFunction, mockSelectedProduct, mockTeamByProductId } from '../../../../common/mock/MockData';

jest.doMock('antd', () => ({ Form: 'Form', Modal: 'Modal', notification: mockFunction }));

import { ProductOwner, handleSubmit } from '../EditProductOwner';

// tslint:disable-next-line:no-any
const _ShallowRenderer: any = ShallowRenderer;
const renderer = new _ShallowRenderer();

const componentProps = {
    teamByProductId: mockTeamByProductId,
    form: {
        ...mockForm,
        getFieldsValue: () => ({ productOwner: '1' }),
        getFieldsError: () => ({})
    },
    changeProductOwner: true,
    setChangeProductOwner: mockFunction,
    selectedProduct: mockSelectedProduct
};

describe('ProductOwner', () => {
    it('should return the expected output', () => {
        const tree = renderer.render(
            <ProductOwner
                selectedProduct={mockSelectedProduct}
                teamByProductId={mockTeamByProductId}
                form={mockForm}
                changeProductOwner={true}
                setChangeProductOwner={mockFunction}
            />
        );
        expect(tree).toMatchSnapshot();
    });

    it('handleSubmit should call updateTeamMutation', () => {
        const updateTeamMutation = mockFunction;
        handleSubmit(componentProps, updateTeamMutation)({ preventDefault: mockFunction });
        expect(updateTeamMutation).toBeCalled();
    });
});
