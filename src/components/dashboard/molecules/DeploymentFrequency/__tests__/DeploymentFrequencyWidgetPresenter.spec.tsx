import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('react-chartjs-2', () => ({ Doughnut: 'Doughnut' }));
jest.mock('../../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter', () => 'LoadingOrErrorPresenter');
jest.mock('../../../../common/molecules/CardLegend/CardLegend', () => ({ CardLegend: 'CardLegend' }));
import DeploymentFrequencyWidgetPresenter from '../DeploymentFrequencyWidgetPresenter';

const mockData = {
    labels: ['Domain 1', 'Domain 2'],
    datasets: [
        {
            data: [1, 2],
            backgroundColor: ['#859ec4']
        }
    ]
};

describe('DeploymentFrequencyWidgetPresenter', () => {
    describe('when there are chart data', () => {
        it('renders Doughnut', () => {
            const wrapper = renderer
                .create(
                    <DeploymentFrequencyWidgetPresenter
                        showTotalBuilds={true}
                        total={3}
                        error=""
                        loading={false}
                        formattedLabels={mockData.labels}
                        chartData={mockData}
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
                    <DeploymentFrequencyWidgetPresenter
                        showTotalBuilds={false}
                        error="Error"
                        total={3}
                        loading={false}
                        formattedLabels={mockData.labels}
                        chartData={undefined}
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
                    <DeploymentFrequencyWidgetPresenter
                        showTotalBuilds={false}
                        error=""
                        total={3}
                        loading={true}
                        formattedLabels={mockData.labels}
                        chartData={undefined}
                    />
                )
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
});
