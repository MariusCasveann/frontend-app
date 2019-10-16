import React, { useState } from 'react';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import GoogleCostWidget from './GoogleCostWidget';
import { DeploymentStageEnum } from '../../../../model/__generated__/globalTypes';
import './GoogleCostPresenter.css';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';

export default () => {
    const [maxValue, setMaxValue] = useState<number>(1000);

    return (
        <FiltersContext.Consumer>
            {({ fromDate, toDate, financialYear }) => (
                <Card title="Google costs" width={100}>
                    <div className="google-cost-card">
                        <div className="chart">
                            <GoogleCostWidget
                                stage={DeploymentStageEnum.DEV}
                                maxValue={maxValue}
                                fromDate={fromDate}
                                toDate={toDate}
                                setMaxValue={setMaxValue}
                                fiscalYear={financialYear}
                            />
                        </div>
                        <div className="chart">
                            <GoogleCostWidget
                                stage={DeploymentStageEnum.PROD}
                                maxValue={maxValue}
                                fromDate={fromDate}
                                toDate={toDate}
                                setMaxValue={setMaxValue}
                                fiscalYear={financialYear}
                            />
                        </div>
                    </div>
                </Card>
            )}
        </FiltersContext.Consumer>
    );
};
