import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('antd', () => ({ Modal: 'Modal' }));
import ConfirmationModal from './../ConfirmModal';
import { mockFunction } from '../../../mock/MockData';

describe('ConfirmationModal', () => {
    it('renders correctly when visible is true', () => {
        const wrapper = renderer
            .create(
                <ConfirmationModal
                    visible={true}
                    text={'Confirmation modal is opened'}
                    title={'Confirmation modal'}
                    onOk={mockFunction}
                    onCancel={mockFunction}
                />
            )
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly when visible is false', () => {
        const wrapper = renderer
            .create(
                <ConfirmationModal
                    visible={false}
                    text={'Confirmation modal is closed'}
                    title={'Confirmation modal'}
                    onOk={mockFunction}
                    onCancel={mockFunction}
                />
            )
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });
});
