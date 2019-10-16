import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('react-chartjs-2', () => ({ Doughnut: 'Doughnut' }));
jest.mock('../../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter', () => 'LoadingOrErrorPresenter');
import DomainRessourcesWidgetPresenter from '../DomainRessourcesWidgetPresenter';

const mockData = {
    labels: [
        'Aggregated(4862.05)',
        'Cloud Build(110.94)',
        'Cloud DNS(4.86)',
        'Cloud Functions(0.01)',
        'Cloud Key Management Service (KMS)(2.9)',
        'Cloud Scheduler(1.2)',
        'Cloud SQL(10255.37)',
        'Cloud Storage(2.24)',
        'Compute Engine(27104.4)',
        'Stackdriver Logging(529.92)',
        'Stackdriver Monitoring(1.9)'
    ],
    datasets: [
        {
            data: [4862.05, 110.94, 4.86, 0.01, 2.9, 1.2, 10255.37, 2.24, 27104.4, 529.92, 1.9],
            backgroundColor: [
                'rgb(34,151,151)',
                'rgb(229,168,25)',
                'rgb(196,2,44)',
                'rgb(118,55,244)',
                'rgb(110,114,123)',
                'rgb(93,30,219)',
                'rgb(191,130,143)',
                'rgb(107,44,233)',
                'rgb(164,168,177)',
                'rgb(57,-6,183)',
                'rgb(209,113,18)',
                'rgb(234,40,82)',
                'rgb(72,9,198)',
                'rgb(44,161,161)'
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
            label: 'Domain Ressources Cost for financial year'
        }
    ]
};

const mockFormattedLabels = [
    'Assortment & Space Management (22412.97 EUR)',
    'B2B Experience (798.72 EUR)',
    'Checkout (Multichannel Experience) (48097.69 EUR)'
];

describe('DomainRessourcesWidgetPresenter', () => {
    describe('when there are chart data', () => {
        it('renders a Doughnut', () => {
            const wrapper = renderer
                .create(
                    <DomainRessourcesWidgetPresenter
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
                    <DomainRessourcesWidgetPresenter
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
                    <DomainRessourcesWidgetPresenter
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
                    <DomainRessourcesWidgetPresenter
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
