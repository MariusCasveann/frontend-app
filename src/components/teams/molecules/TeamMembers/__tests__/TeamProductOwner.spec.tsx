import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('antd', () => ({ Avatar: 'Avatar', Icon: 'Icon', Button: 'Button' }));
import TeamProductOwnerPresenter from '../TeamProductOwnerPresenter';
import { mockEmptyTeam, mockTeamByProductId } from '../../../../common/mock/MockData';

describe('TeamProductOwnerPresenter', () => {
    describe('when there is value', () => {
        it('renders a Card with teammembers', () => {
            const wrapper = renderer
                .create(<TeamProductOwnerPresenter teamByProductId={mockTeamByProductId} />)
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
    describe('when there is no data', () => {
        it('renders no data', () => {
            const wrapper = renderer.create(<TeamProductOwnerPresenter teamByProductId={mockEmptyTeam} />).toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
});
