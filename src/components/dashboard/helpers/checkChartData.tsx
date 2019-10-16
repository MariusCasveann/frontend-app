import * as chartjs from 'chart.js';
import { colors, dynamicColors } from '../../../config/colors';
import { QueryBilling_billingQuery } from '../molecules/common/qraphql/__generated__/QueryBilling';

export const hasChartData = (chartData?: chartjs.ChartData) =>
    chartData && chartData.labels && chartData.labels.length > 0;

export const hasNoChartData = (chartData?: chartjs.ChartData) =>
    chartData && chartData.labels && chartData.labels.length === 0;

export const mappedData = (data?: QueryBilling_billingQuery[]) => {
    const filterData = filteredData(data);
    return (filterData && filterData.map(e => e && e.cost)) || [];
};

export const filteredData = (data?: QueryBilling_billingQuery[]) => data && data.filter(e => e && e.cost);

export const filteredLabels = (data: QueryBilling_billingQuery[]) => {
    const filterData = data && data.filter(e => e && e.cost);
    return (filterData && filterData.map(e => (e && e.resourceType + ' in ' + e.currency) || '')) || [];
};

export const formatLabels = (billingQuery: QueryBilling_billingQuery[]) =>
    (billingQuery && billingQuery.map(e => (e && `${e.resourceType} (${e.cost} ${e.currency})`) || '')) || [];

export const buildChartData = (data: QueryBilling_billingQuery[] | null) => {
    if (data) {
        const colors = data.map((e, colorIndex) => dynamicColors(colorIndex));

        return {
            labels: filteredLabels(data),
            datasets: [
                {
                    backgroundColor: colors,
                    data: mappedData(data)
                }
            ]
        };
    }
};

export const buildAggregatedChartData = (label: string, data?: QueryBilling_billingQuery[] | null) => {
    if (data) {
        const filterData = data && data.filter(e => e && e.cost);

        // Sum up all costs
        const result = new Map();
        filterData.forEach(element => {
            if (result.get(element.resourceType)) {
                result.set(element.resourceType, result.get(element.resourceType) + element.cost);
            } else {
                result.set(element.resourceType, element.cost);
            }
        });

        const filteredCurrency = new Map();

        filterData.forEach(item => {
            if (!filteredCurrency.get(item.resourceType)) {
                filteredCurrency.set(item.resourceType, item.currency);
            }
        });

        // Get labels
        const formattedLabels: string[] = [];
        const labels: string[] = [];
        result.forEach((value, key) => {
            formattedLabels.push(`${key} (${value.toFixed(2)} ${filteredCurrency.get(key)})`);
            labels.push(`${key} in ${filteredCurrency.get(key)}`);
        });

        let costs: number[] = [];
        result.forEach(value => {
            costs.push(value);
        });
        costs = costs.map(element => Number(element.toFixed(2)));

        return {
            labels,
            formattedLabels,
            datasets: [
                {
                    label,
                    backgroundColor: colors,
                    data: costs || []
                }
            ]
        };
    }
};

export const getTotalCost = (filterData?: QueryBilling_billingQuery[]) => {
    let totalCost: number;
    totalCost = (filterData && filterData.reduce((total, costs) => Number((total + costs.cost).toFixed(2)), 0)) || 0;
    return totalCost;
};
