import React from 'react';
import * as chartjs from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import LoadingOrErrorPresenter from '../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter';
import { hasChartData, hasNoChartData } from '../../helpers/checkChartData';
import '../common/css/CostWidget.css';
import { CardLegend } from '../../../common/molecules/CardLegend/CardLegend';
import { colors } from '../../../../config/colors';
import { MESSAGE_WHEN_NO_DATA } from '../../../../utils/constants';

interface AccumulatedProductCostProps {
    formattedLabels: string[];
    loading: boolean;
    error: string;
    chartData?: chartjs.ChartData;
}

export default ({ chartData, formattedLabels, loading, error }: AccumulatedProductCostProps) => {
    if (loading || error) {
        return <LoadingOrErrorPresenter error={error} loading={loading} />;
    }
    if (!loading && hasChartData(chartData)) {
        return (
            <div className="domain-legend-container">
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
        return <p>{MESSAGE_WHEN_NO_DATA}</p>;
    }

    return null;
};
