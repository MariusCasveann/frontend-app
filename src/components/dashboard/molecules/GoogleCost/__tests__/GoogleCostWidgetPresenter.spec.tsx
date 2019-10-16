import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('react-chartjs-2', () => ({ Bar: 'Bar' }));
jest.mock('../../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter', () => 'LoadingOrErrorPresenter');
import GoogleCostWidgetPresenter from '../GoogleCostWidgetPresenter';
import { DeploymentStageEnum } from '../../../../../model/__generated__/globalTypes';

const mockData = {
    labels: ['Oct.', 'Nov.', 'Dec.', 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.'],
    datasets: [
        {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
            backgroundColor: ['#859ec4']
        }
    ]
};

const mockMaxValue = 80.0;

describe('GoogleCostWidgetPresenter', () => {
    describe('when there are chart data', () => {
        it('renders a Bar chart', () => {
            const wrapper = renderer
                .create(
                    <GoogleCostWidgetPresenter
                        maxValue={mockMaxValue}
                        error=""
                        loading={false}
                        chartData={mockData}
                        sumMonth={78}
                        stage={DeploymentStageEnum.DEV}
                    />
                )
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when chart data is undefined', () => {
        it('renders an error', () => {
            const wrapper = renderer
                .create(
                    <GoogleCostWidgetPresenter
                        maxValue={mockMaxValue}
                        error="Error"
                        loading={false}
                        chartData={undefined}
                        sumMonth={78}
                        stage={DeploymentStageEnum.DEV}
                    />
                )
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when chart data is undefined', () => {
        it('renders loading', () => {
            const wrapper = renderer
                .create(
                    <GoogleCostWidgetPresenter
                        maxValue={mockMaxValue}
                        error=""
                        loading={true}
                        chartData={undefined}
                        sumMonth={78}
                        stage={DeploymentStageEnum.DEV}
                    />
                )
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
});
