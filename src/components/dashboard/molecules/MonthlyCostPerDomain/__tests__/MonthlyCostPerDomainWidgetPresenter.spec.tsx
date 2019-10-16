import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('react-chartjs-2', () => ({ Bar: 'Bar' }));
jest.mock('../../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter', () => 'LoadingOrErrorPresenter');
import MonthlyCostPerDomainWidgetPresenter from '../MonthlyCostPerDomainWidgetPresenter';

const mockData = {
    labels: ['cloud-ccr', 'pref-center', 'promotions', 'rea'],
    datasets: [
        {
            data: [2111.74, 159.63, 802.89, 222.99],
            backgroundColor: '#859ec4ß',
            label: 'Monthly cost'
        }
    ]
};

const mockEmptyData = {
    labels: [],
    datasets: [
        {
            data: [],
            backgroundColor: '#859ec4',
            label: 'Monthly cost'
        }
    ]
};

describe('MonthlyCostPerDomainWidgetPresenter', () => {
    describe('when there are chart data', () => {
        it('renders a Bar widget', () => {
            const wrapper = renderer
                .create(<MonthlyCostPerDomainWidgetPresenter error={''} loading={false} chartData={mockData} />)
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when there are no chart data', () => {
        it('doesnt render a Bar widget', () => {
            const wrapper = renderer
                .create(<MonthlyCostPerDomainWidgetPresenter error={''} loading={false} chartData={mockEmptyData} />)
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when chart data is undefined', () => {
        it('renders loading', () => {
            const wrapper = renderer
                .create(<MonthlyCostPerDomainWidgetPresenter error={''} loading={true} chartData={undefined} />)
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when chart data is undefined', () => {
        it('renders an error', () => {
            const wrapper = renderer
                .create(<MonthlyCostPerDomainWidgetPresenter error={'Error'} loading={false} chartData={undefined} />)
                .toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });
});
