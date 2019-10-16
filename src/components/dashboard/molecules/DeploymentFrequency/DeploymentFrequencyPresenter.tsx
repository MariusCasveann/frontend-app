import React from 'react';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import './DeploymentFrequency.css';
import DeploymentFrequencyWidget from './DeploymentFrequencyWidget';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';

export default () => (
    <FiltersContext.Consumer>
        {({ fromDate, toDate, financialYear, messageWhenNoData }) => (
            <Card className="deployment-frequency-container" title="Deployment Frequency KPIs" width={100}>
                <DeploymentFrequencyWidget
                    messageWhenNoData={messageWhenNoData}
                    fromDate={fromDate}
                    toDate={toDate}
                    financialYear={financialYear}
                />
            </Card>
        )}
    </FiltersContext.Consumer>
);
