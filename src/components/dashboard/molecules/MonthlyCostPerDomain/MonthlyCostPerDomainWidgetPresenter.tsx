import React from 'react';
import * as chartjs from 'chart.js';
import { Bar } from 'react-chartjs-2';
import LoadingOrErrorPresenter from '../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter';
import { hasChartData } from '../../helpers/checkChartData';
import './MonthlyCostPerDomain.css';
import { MESSAGE_WHEN_NO_DATA } from '../../../../utils/constants';

interface MonthlyCostPerDomainProps {
    chartData?: chartjs.ChartData;
    error: string;
    loading: boolean;
}

export default ({ chartData, error, loading }: MonthlyCostPerDomainProps) => {
    if (loading || error) {
        return <LoadingOrErrorPresenter error={error} loading={loading} />;
    }
    if (hasChartData(chartData)) {
        return (
            <div className="chart">
                {chartData && (
                    <Bar
                        data={chartData}
                        options={{
                            scales: {
                                xAxes: [
                                    {
                                        barPercentage: 0.3
                                    }
                                ]
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            legend: {
                                display: false
                            }
                        }}
                    />
                )}
            </div>
        );
    }
    return <p>{MESSAGE_WHEN_NO_DATA}</p>;
};
