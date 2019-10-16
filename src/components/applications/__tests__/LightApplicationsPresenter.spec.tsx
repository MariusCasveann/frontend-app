import * as React from 'react';
import renderer from 'react-test-renderer';

jest.doMock('antd', () => ({ List: 'List', 'List.Item': 'List.Item', 'List.Item.Meta': 'List.Item.Meta' }));
jest.mock('../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card' }));
jest.mock('../../common/organisms/LoadingOrError/LoadingOrErrorPresenter', () => 'LoadingOrErrorPresenter');

import LightApplicationsPresenter from '../LightApplicationsPresenter';
import { mockedApplications } from '../../common/mock/MockData';

describe('LightApplicationsPresenter', () => {
    it('renders correctly when there are applications', () => {
        const wrapper = renderer
            .create(
                <LightApplicationsPresenter error="" loading={false} lightApplicationsOfProduct={mockedApplications} />
            )
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders an error', () => {
        const wrapper = renderer
            .create(<LightApplicationsPresenter error="error" loading={false} lightApplicationsOfProduct={[]} />)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it('renders loading', () => {
        const wrapper = renderer
            .create(<LightApplicationsPresenter error="" loading={true} lightApplicationsOfProduct={[]} />)
            .toJSON();
        expect(wrapper).toMatchSnapshot();
    });
});
