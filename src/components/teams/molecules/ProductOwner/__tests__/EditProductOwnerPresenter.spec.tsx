import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

jest.doMock('antd', () => ({ Form: 'Form', 'Form.Item': 'Form.Item' }));
jest.doMock('../../../../common/molecules/SearchableSelect/SearchableSelectPresenter', () => ({
    SearchableSelectPresenter: 'SearchableSelectPresenter'
}));

// tslint:disable-next-line:no-any
const _ShallowRenderer: any = ShallowRenderer;
const renderer = new _ShallowRenderer();

import EditProductOwnerPresenter from '../EditProductOwnerPresenter';
import { mockForm, mockFunction, mockSelectData, mockTeamByProductId } from '../../../../common/mock/MockData';

describe('EditProductOwnerPresenter', () => {
    it('should return the expected output when changeProductOwner is true ', () => {
        const tree = renderer.render(
            <EditProductOwnerPresenter
                getFieldDecorator={mockForm.getFieldDecorator}
                team={mockTeamByProductId}
                changeProductOwner={true}
                setChangeProductOwner={mockFunction}
                handleSubmit={mockFunction}
                productOwnerOptions={mockSelectData}
                loadingProductOwner={false}
                setSearchProductOwnerInput={mockFunction}
            />
        );
        expect(tree).toMatchSnapshot();
    });

    it('should return the expected output when changeProductOwner is false ', () => {
        const tree = renderer.render(
            <EditProductOwnerPresenter
                getFieldDecorator={mockForm.getFieldDecorator}
                team={mockTeamByProductId}
                changeProductOwner={false}
                setChangeProductOwner={mockFunction}
                handleSubmit={mockFunction}
                productOwnerOptions={mockSelectData}
                loadingProductOwner={false}
                setSearchProductOwnerInput={mockFunction}
            />
        );
        expect(tree).toMatchSnapshot();
    });
});
