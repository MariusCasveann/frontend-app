import React, { useState, useEffect } from 'react';
import * as chartjs from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import LoadingOrErrorPresenter from '../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter';
import { nightblue, lightNightblue, grey } from '../../../../config/colors';
import { hasChartData, hasNoChartData } from '../../helpers/checkChartData';
import './CpuUtilization.css';
import './../common/css/CostWidget.css';
import { CardLegend } from '../../../common/molecules/CardLegend/CardLegend';
import { MESSAGE_WHEN_NO_DATA } from '../../../../utils/constants';

interface CpuWidgetPresenterProps {
    loading: boolean;
    error?: string;
    chartData?: chartjs.ChartData;
}

const buildLabel = (tooltipItem: Chart.ChartTooltipItem, chart: Chart.ChartData) => {
    let name, value;
    const labels: string[][] = [['CPU-Dev', 'CPU-Dev not used'], ['CPU-Prod', 'CPU-Prod not used']];

    if (tooltipItem.datasetIndex !== undefined && tooltipItem.index !== undefined) {
        name = labels[tooltipItem.datasetIndex][tooltipItem.index];
        const data =
            chart.datasets && chart.datasets[tooltipItem.datasetIndex] && chart.datasets[tooltipItem.datasetIndex].data;
        value = data && data[tooltipItem.index];
    }

    const label = value && (value as number).toFixed(2).toString();
    return name + ': ' + label + ' %';
};

export default ({ chartData, loading, error }: CpuWidgetPresenterProps) => {
    const [data, setData] = useState(chartData);

    useEffect(() => {
        setData(chartData);
    }, [chartData]);

    const colors = [nightblue, lightNightblue, grey];

    if (loading || error) {
        return <LoadingOrErrorPresenter error={error} loading={loading} />;
    }

    if (hasChartData(data)) {
        return (
            <div className="domain-legend-container">
                {data && (
                    <React.Fragment>
                        {chartData && <CardLegend labels={chartData.labels} colors={colors} />}
                        <div>
                            <Doughnut
                                data={data}
                                legend={{
                                    display: false
                                }}
                                options={{
                                    circumference: Math.PI,
                                    rotation: Math.PI,
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    tooltips: {
                                        callbacks: {
                                            label: buildLabel
                                        }
                                    }
                                }}
                            />
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    } else if (hasNoChartData(chartData)) {
        return <p>{MESSAGE_WHEN_NO_DATA}</p>;
    }

    return null;
};
