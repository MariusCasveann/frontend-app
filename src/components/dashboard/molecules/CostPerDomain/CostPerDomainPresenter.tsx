import React, { useState } from 'react';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import { QueryAllDomains_allDomains } from '../../atoms/DomainSelection/graphql/__generated__/QueryAllDomains';
import CostPerDomainWidget from './CostPerDomainWidget';
import { DeploymentStageEnum } from '../../../../model/__generated__/globalTypes';
import './CostPerDomain.css';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';
import { MESSAGE_WHEN_NO_DATA } from '../../../../utils/constants';

interface CostPerDomainPresenterProps {
    selectedDomain: QueryAllDomains_allDomains | undefined;
}

export default ({ selectedDomain }: CostPerDomainPresenterProps) => {
    const [noDataForFirstWidget, setNoDataForFirstWidget] = useState<boolean>(false);
    const [noDataForSecondWidget, setNoDataForSecondWidget] = useState<boolean>(false);

    if (noDataForFirstWidget && noDataForSecondWidget) {
        return (
            <Card className="cost-per-domain-card" title="Cost per domain" width={45}>
                <p>{MESSAGE_WHEN_NO_DATA}</p>
            </Card>
        );
    }

    return (
        <FiltersContext.Consumer>
            {({ fromDate, toDate, financialYear }) => (
                <Card className="cost-per-domain-card" title="Cost per domain" width={45}>
                    <div className="cost-per-domain-card">
                        <div className="chart">
                            {selectedDomain && (
                                <CostPerDomainWidget
                                    stage={DeploymentStageEnum.DEV}
                                    fromDate={fromDate}
                                    financialYear={financialYear}
                                    setNoDataFlag={setNoDataForFirstWidget}
                                    toDate={toDate}
                                    selectedDomainId={selectedDomain && selectedDomain.id}
                                />
                            )}
                        </div>
                        <div className="chart">
                            {selectedDomain && (
                                <CostPerDomainWidget
                                    stage={DeploymentStageEnum.PROD}
                                    fromDate={fromDate}
                                    financialYear={financialYear}
                                    setNoDataFlag={setNoDataForSecondWidget}
                                    toDate={toDate}
                                    selectedDomainId={selectedDomain && selectedDomain.id}
                                />
                            )}
                        </div>
                    </div>
                </Card>
            )}
        </FiltersContext.Consumer>
    );
};
