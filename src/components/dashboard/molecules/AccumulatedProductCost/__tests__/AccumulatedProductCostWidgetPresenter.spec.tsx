import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('react-chartjs-2', () => ({ Doughnut: 'Doughnut' }));
jest.mock('../../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter', () => 'LoadingOrErrorPresenter');
jest.mock('../../../../common/molecules/CardLegend/CardLegend', () => ({ CardLegend: 'CardLegend' }));
import AccumulatedProductCostWidgetPresenter from '../AccumulatedProductCostWidgetPresenter';

const mockData = {
    labels: [
        'Cloud Build(424.15)',
        'Source Repository(1.5)',
        'Cloud Key Management Service (KMS)(168.46)',
        'Compute Engine(9261.77)'
    ],
    datasets: [
        {
            data: [424.15, 1.5, 168.46, 9261.77],
            backgroundColor: ['rgb(109,46,235)', 'rgb(222,28,70)', 'rgb(220,159,172)', 'rgb(125,62,251)']
        }
    ]
};

const mockEmptyData = {
    labels: [],
    datasets: [
        {
            data: [],
            backgroundColor: [],
            label: 'Accumulated product cost'
        }
    ]
};

const mockFormattedLabels = [
    'BigQuery (16958.16 EUR)',
    'Cloud Build (10.53 EUR)',
    'Cloud DNS (0.56 EUR)',
    'Cloud Functions (0 EUR)',
    'Cloud Key Management Service (KMS) (1.11 EUR)'
];

describe('AccumulatedProductCostWidgetPresenter', () => {
    describe('when there are chart data', () => {
        it('renders a Doughnut', () => {
            const wrapper = renderer
                .create(
                    <AccumulatedProductCostWidgetPresenter
                        formattedLabels={mockFormattedLabels}
                        error={''}
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
                    <AccumulatedProductCostWidgetPresenter
                        formattedLabels={mockFormattedLabels}
                        error={''}
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
                    <AccumulatedProductCostWidgetPresenter
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
                    <AccumulatedProductCostWidgetPresenter
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
