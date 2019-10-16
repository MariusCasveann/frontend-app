import React from 'react';
import * as chartjs from 'chart.js';
import { Bar } from 'react-chartjs-2';
import LoadingOrErrorPresenter from '../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter';
import { hasChartData } from '../../helpers/checkChartData';
import NumberDisplay, { NumberType } from '../../../common/molecules/NumberDisplay/NumberDisplay';
import { DeploymentStageEnum } from '../../../../model/__generated__/globalTypes';
import './GoogleCostPresenter.css';
import { MESSAGE_WHEN_NO_DATA } from '../../../../utils/constants';

interface GoogleCostWidgetPresenterProps {
    loading: boolean;
    error: string;
    chartData?: chartjs.ChartData;
    sumMonth: number;
    maxValue: number;
    stage: DeploymentStageEnum;
}

export default ({ chartData, error, loading, sumMonth, stage, maxValue }: GoogleCostWidgetPresenterProps) => {
    if (loading || error) {
        return <LoadingOrErrorPresenter error={error} loading={loading} />;
    }
    if (hasChartData(chartData)) {
        return (
            <>
                <div className="chart">
                    {chartData && (
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                legend: {
                                    display: false
                                },
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                max: maxValue
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                    )}
                </div>
                <div className="numbers-container">
                    <NumberDisplay value={sumMonth} type={NumberType.currency} label={stage} />
                </div>
            </>
        );
    } else if (hasChartData(chartData)) {
        return <p>{MESSAGE_WHEN_NO_DATA}</p>;
    }

    return null;
};
