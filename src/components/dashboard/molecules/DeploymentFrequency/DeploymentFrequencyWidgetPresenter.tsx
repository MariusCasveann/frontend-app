import React from 'react';
import * as chartjs from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { hasChartData, hasNoChartData } from '../../helpers/checkChartData';
import LoadingOrErrorPresenter from '../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter';
import { CardLegend } from '../../../common/molecules/CardLegend/CardLegend';
import { colors } from '../../../../config/colors';
import './DeploymentFrequency.css';
import { MESSAGE_WHEN_NO_DATA } from '../../../../utils/constants';

interface DeploymentFrequencyProps {
    total: number;
    loading: boolean;
    formattedLabels: string[];
    error?: string;
    showTotalBuilds?: boolean;
    chartData?: chartjs.ChartData;
    messageWhenNoData?: string;
}

export default ({
    showTotalBuilds,
    chartData,
    messageWhenNoData,
    loading,
    error,
    formattedLabels,
    total
}: DeploymentFrequencyProps) => {
    if (loading || error) {
        return <LoadingOrErrorPresenter error={error} loading={loading} />;
    }

    if (hasChartData(chartData)) {
        return (
            <>
                {showTotalBuilds && (
                    <div className="builds-number">
                        <div className="total-builds">{total}</div>
                        <p>Total</p>
                    </div>
                )}
                {chartData && hasChartData(chartData) && <CardLegend labels={formattedLabels} colors={colors} />}
                {chartData && hasChartData(chartData) && (
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
            </>
        );
    }

    if (hasNoChartData(chartData)) {
        return <p>{messageWhenNoData || MESSAGE_WHEN_NO_DATA}</p>;
    }

    return null;
};
