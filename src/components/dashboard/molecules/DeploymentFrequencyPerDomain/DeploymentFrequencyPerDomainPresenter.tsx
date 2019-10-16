import React from 'react';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import { QueryAllDomains_allDomains } from '../../atoms/DomainSelection/graphql/__generated__/QueryAllDomains';
import DeploymentFrequencyWidget from '../DeploymentFrequency/DeploymentFrequencyWidget';
import '../DeploymentFrequency/DeploymentFrequency.css';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';

interface DeploymentFrequencyPerDomainPresenterProps {
    selectedDomain: QueryAllDomains_allDomains | undefined;
}

export default ({ selectedDomain }: DeploymentFrequencyPerDomainPresenterProps) => (
    <FiltersContext.Consumer>
        {({ fromDate, toDate }) => (
            <Card title="Deployment Frequency KPIs" width={45} className="deployment-frequency-per-resource-card">
                {selectedDomain && (
                    <DeploymentFrequencyWidget
                        fromDate={fromDate}
                        toDate={toDate}
                        showTotalBuilds={false}
                        selectedEntityState={selectedDomain}
                    />
                )}
            </Card>
        )}
    </FiltersContext.Consumer>
);
