import React, { useEffect } from 'react';
import { loader } from 'graphql.macro';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { RootState } from '../../../../state/RootState';
import { GraphQLError } from 'graphql';
import GoogleCostWidgetPresenter from './GoogleCostWidgetPresenter';
import {
    fiscalYearEnd,
    fiscalYearMonthLabels,
    fiscalYearStart,
    monthLabels,
    notFiscalYearEnd,
    notFiscalYearStart
} from '../../../../utils/fiscalYear';
import { DeploymentStageEnum } from '../../../../model/__generated__/globalTypes';
import { lightNightblue, nightblue } from '../../../../config/colors';
import { QueryBilling_billingQuery } from '../common/qraphql/__generated__/QueryBilling';

const query = loader('./../common/qraphql/QueryBilling.graphql');

interface QueryBillingProps {
    billingQuery: QueryBilling_billingQuery[] | null;
    loading: boolean;
    error: GraphQLError;
}

interface GraphQLProps {
    googleCost: QueryBillingProps;
}

interface GoogleCostWidget {
    stage: DeploymentStageEnum;
    fiscalYear?: string;
    fromDate?: string;
    toDate?: string;
    maxValue: number;
    setMaxValue: (maxValue: number) => void;
}

export const mapStateToProps = (state: RootState, { googleCost: { billingQuery, error, loading } }: GraphQLProps) => ({
    data: billingQuery,
    loading,
    error: error && error.message
});

export const buildMonthValues = (data: QueryBilling_billingQuery[], fiscalYear?: boolean | string) => {
    const filterData = data && data.filter(e => e && e.cost);
    let monthValues = Array<number>(12).fill(0);
    filterData.forEach(e => {
        monthValues[new Date(e.date).getMonth()] += e.cost;
    });
    monthValues = fiscalYear ? monthValues.concat(monthValues.splice(0, 9)) : monthValues;
    monthValues = monthValues.map(element => Number(element.toFixed(2)));
    return filterData && monthValues;
};

export const buildChartData = (
    data?: QueryBilling_billingQuery[] | null,
    fiscalYear?: boolean | string,
    stage?: DeploymentStageEnum
) => {
    if (data) {
        const currency = (data[0] && data[0].currency) || '';

        return {
            labels: fiscalYear ? fiscalYearMonthLabels : monthLabels,
            datasets: [
                {
                    label: `Google Cost in ${currency}`,
                    backgroundColor: stage === DeploymentStageEnum.DEV ? lightNightblue : nightblue,
                    data: buildMonthValues(data, fiscalYear) || []
                }
            ]
        };
    }
};

// Round the value for Y axis
export const roundValue = (value: number) => {
    const digits = (Math.log(value) * Math.LOG10E + 1) | 0;
    const ceilBase = Math.pow(10, digits - 1);
    return Math.ceil(value / ceilBase) * ceilBase;
};

// Component
const GoogleCostWidget = ({
    googleCost,
    fiscalYear,
    stage,
    fromDate,
    toDate,
    maxValue,
    setMaxValue
}: GraphQLProps & GoogleCostWidget) => {
    const chartData = buildChartData(googleCost.billingQuery, fiscalYear || false, stage);

    useEffect(() => {
        const max =
            chartData &&
            chartData.datasets &&
            chartData.datasets[0] &&
            chartData.datasets[0].data &&
            Math.max(...chartData.datasets[0].data.map(value => value), 0);

        if (max && max > maxValue) {
            setMaxValue(Number(max));
        }
    });

    if (googleCost && googleCost.billingQuery) {
        const sumMonth =
            (chartData && chartData.datasets && chartData.datasets[0].data.reduce((total, costs) => total + costs)) ||
            0;
        const newMaxValue = roundValue(maxValue);

        return (
            <GoogleCostWidgetPresenter
                stage={stage}
                maxValue={newMaxValue}
                sumMonth={Number(sumMonth.toFixed(2))}
                chartData={chartData}
                loading={googleCost.loading}
                error={googleCost.error && googleCost.error.message}
            />
        );
    }
    return null;
};

export default compose(
    graphql(query, {
        name: 'googleCost',
        options: ({ fiscalYear, stage, fromDate, toDate }: GoogleCostWidget) => ({
            variables: {
                fromDate: fromDate || (fiscalYear ? fiscalYearStart : notFiscalYearStart),
                toDate: toDate || (fiscalYear ? fiscalYearEnd : notFiscalYearEnd),
                stage: stage.toLowerCase()
            }
        })
    }),
    connect(mapStateToProps)
)(GoogleCostWidget);
