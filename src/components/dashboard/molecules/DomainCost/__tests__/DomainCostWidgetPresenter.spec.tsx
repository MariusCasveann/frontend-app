import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('react-chartjs-2', () => ({ Doughnut: 'Doughnut' }));
jest.mock('../../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter', () => 'LoadingOrErrorPresenter');
jest.mock('../../../../common/molecules/CardLegend/CardLegend', () => ({ CardLegend: 'CardLegend' }));
import DomainCostWidgetPresenter from '../DomainCostWidgetPresenter';

const mockData = {
    labels: [
        'Customer Retention(49198.94)',
        'Checkout (Multichannel Experience)(60463.31)',
        'B2B Experience(983.12)',
        'Service Management(6401.91)'
    ],
    datasets: [
        {
            data: [49198.94, 60463.31, 983.12, 6401.91],
            backgroundColor: ['rgb(109,46,235)', 'rgb(222,28,70)', 'rgb(220,159,172)', 'rgb(125,62,251)']
        }
    ]
};

const mockFormattedLabels = [
    'Assortment & Space Management (22412.97 EUR)',
    'B2B Experience (798.72 EUR)',
    'Checkout (Multichannel Experience) (48097.69 EUR)'
];

const mockEmptyData = {
    labels: [],
    datasets: [
        {
            data: [],
            backgroundColor: [],
            label: 'Domain costs for financial year"'
        }
    ]
};

describe('DomainCostWidgetPresenter', () => {
    describe('when there are chart data', () => {
        it('renders a Doughnut', () => {
            const wrapper = renderer
                .create(
                    <DomainCostWidgetPresenter
                        formattedLabels={mockFormattedLabels}
                        error=""
                        loading={false}
                        chartData={mockData}
                    />
                )
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when there are no chart data', () => {
        it('doesnt render a Doughnut', () => {
            const wrapper = renderer
                .create(
                    <DomainCostWidgetPresenter
                        formattedLabels={mockFormattedLabels}
                        error=""
                        loading={false}
                        chartData={mockEmptyData}
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
                    <DomainCostWidgetPresenter
                        formattedLabels={mockFormattedLabels}
                        error={''}
                        loading={true}
                        chartData={undefined}
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
                    <DomainCostWidgetPresenter
                        formattedLabels={mockFormattedLabels}
                        error={'Error'}
                        loading={false}
                        chartData={undefined}
                    />
                )
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
});
