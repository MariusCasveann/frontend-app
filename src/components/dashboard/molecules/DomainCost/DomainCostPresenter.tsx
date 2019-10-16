import React from 'react';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';
import DomainCostWidget from './DomainCostWidget';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import '../common/css/CostWidget.css';

export default () => (
    <FiltersContext.Consumer>
        {({ fromDate, toDate, financialYear, messageWhenNoData }) => (
            <Card className="domain-cost-card" title="Domain costs" width={100}>
                <DomainCostWidget
                    fromDate={fromDate}
                    messageWhenNoData={messageWhenNoData}
                    toDate={toDate}
                    financialYear={financialYear}
                />
            </Card>
        )}
    </FiltersContext.Consumer>
);
