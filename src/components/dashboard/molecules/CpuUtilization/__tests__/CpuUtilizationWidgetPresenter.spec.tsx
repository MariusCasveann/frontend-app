import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('react-chartjs-2', () => ({ Doughnut: 'Doughnut' }));
jest.mock('../../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter', () => 'LoadingOrErrorPresenter');
jest.mock('../../../../common/molecules/CardLegend/CardLegend', () => ({ CardLegend: 'CardLegend' }));
import CpuUtilizationWidgetPresenter from '../CpuUtilizationWidgetPresenter';

const mockData = {
    labels: ['Dev', 'Prod', 'Not used'],
    datasets: [
        {
            label: 'Dev',
            data: [0.0618, 9.382],
            backgroundColor: ['#859ec4', '#D8DADA']
        },
        {
            label: 'Prod',
            data: [0.0309, 9.691],
            backgroundColor: ['#859ec4', '#D8DADA']
        }
    ]
};

const mockEmptyData = {
    labels: [],
    datasets: [
        {
            data: [],
            backgroundColor: '#0c3d8a',
            label: 'Dev'
        },
        {
            data: [],
            backgroundColor: '#859ec4',
            label: 'Prod'
        }
    ]
};

describe('CpuUtilizationYearWidgetPresenter', () => {
    describe('when there are chart data', () => {
        it('renders a Semi Doughnut', () => {
            const wrapper = renderer
                .create(<CpuUtilizationWidgetPresenter error={undefined} loading={false} chartData={mockData} />)
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when there are no chart data', () => {
        it('doesnt render a Semi Doughnut', () => {
            const wrapper = renderer
                .create(<CpuUtilizationWidgetPresenter error={undefined} loading={false} chartData={undefined} />)
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when chart data is empty', () => {
        it('renders any data for the product', () => {
            const wrapper = renderer
                .create(<CpuUtilizationWidgetPresenter error={undefined} loading={false} chartData={mockEmptyData} />)
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when there is an error', () => {
        it('renders an error message', () => {
            const wrapper = renderer
                .create(<CpuUtilizationWidgetPresenter error={'Error message'} loading={false} chartData={undefined} />)
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when the data is loading', () => {
        it('renders Loading', () => {
            const wrapper = renderer
                .create(<CpuUtilizationWidgetPresenter error={undefined} loading={true} chartData={undefined} />)
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
});
