import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('react-chartjs-2', () => ({ Doughnut: 'Doughnut' }));
jest.mock('../../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter', () => 'LoadingOrErrorPresenter');
jest.mock('../../../../common/molecules/CardLegend/CardLegend', () => ({ CardLegend: 'CardLegend' }));
import ProductCostWidgetPresenter from '../ProductCostWidgetPresenter';

const mockData = {
    formattedLabels: [
        'api-management (5385.09 EUR)',
        'cicd (29057.45 EUR)',
        'cloud-academy (249.92 EUR)',
        'cloud-deploy (463.79 EUR)',
        'cloud-foundation (1954.63 EUR)',
        'cse-reskill (5.62 EUR)',
        'dp-integ (1194.30 EUR)'
    ],
    labels: [
        'api-management in EUR',
        'cicd in EUR',
        'cloud-academy in EUR',
        'cloud-deploy in EUR',
        'cloud-foundation in EUR',
        'cse-reskill in EUR',
        'dp-integ in EUR'
    ],
    datasets: [
        {
            data: [5385.09, 9057.45, 249.92, 463.79, 1954.63, 5.62, 1194.3],
            backgroundColor: [
                'rgb(34,151,151)',
                'rgb(229,168,25)',
                'rgb(196,2,44)',
                'rgb(118,55,244)',
                'rgb(110,114,123)',
                'rgb(93,30,219)',
                'rgb(191,130,143)'
            ]
        }
    ]
};

const mockEmptyData = {
    labels: [],
    datasets: [
        {
            data: [],
            backgroundColor: [],
            label: 'Product cost'
        }
    ]
};

describe('ProductCostWidgetPresenter', () => {
    describe('when there are chart data', () => {
        it('renders a Doughnut', () => {
            const wrapper = renderer
                .create(
                    <ProductCostWidgetPresenter
                        formattedLabels={mockData.formattedLabels}
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
                    <ProductCostWidgetPresenter
                        formattedLabels={mockData.formattedLabels}
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
                    <ProductCostWidgetPresenter
                        formattedLabels={mockData.formattedLabels}
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
                    <ProductCostWidgetPresenter
                        formattedLabels={mockData.formattedLabels}
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
