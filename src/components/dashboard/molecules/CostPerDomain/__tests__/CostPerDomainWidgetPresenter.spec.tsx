import * as React from 'react';
import renderer from 'react-test-renderer';
import { DeploymentStageEnum } from '../../../../../model/__generated__/globalTypes';
jest.mock('../../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter', () => 'LoadingOrErrorPresenter');
import CostPerDomainWidgetPresenter from '../CostPerDomainWidgetPresenter';

describe('CostPerDomainWidgetPresenter', () => {
    describe('when there is value', () => {
        it('renders a NumberDisplay', () => {
            const wrapper = renderer
                .create(
                    <CostPerDomainWidgetPresenter error="" loading={false} value={78} stage={DeploymentStageEnum.DEV} />
                )
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when there is zero value', () => {
        it('renders any data', () => {
            const wrapper = renderer
                .create(
                    <CostPerDomainWidgetPresenter error="" loading={false} value={0} stage={DeploymentStageEnum.DEV} />
                )
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
});
