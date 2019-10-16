import React from 'react';
import * as chartjs from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import LoadingOrErrorPresenter from '../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter';
import { hasChartData, hasNoChartData } from '../../helpers/checkChartData';
import { CardLegend } from '../../../common/molecules/CardLegend/CardLegend';
import { colors } from '../../../../config/colors';

interface DomainCostProps {
    loading: boolean;
    error: string;
    chartData?: chartjs.ChartData;
    formattedLabels: string[];
    messageWhenNoData?: string;
}

export default ({ chartData, formattedLabels, loading, error, messageWhenNoData }: DomainCostProps) => {
    if (hasChartData(chartData)) {
        return (
            <div className="domain-legend-container">
                {loading || error ? <LoadingOrErrorPresenter error={error} loading={loading} /> : false}
                {chartData && <CardLegend labels={formattedLabels} colors={colors} />}
                {chartData && (
                    <div className="canvas-container">
                        <Doughnut
                            data={chartData}
                            options={{
                                responsive: true,
                                legend: { display: false }
                            }}
                        />
                    </div>
                )}
            </div>
        );
    } else if (hasNoChartData(chartData)) {
        return <p>{messageWhenNoData}</p>;
    }

    return null;
};
