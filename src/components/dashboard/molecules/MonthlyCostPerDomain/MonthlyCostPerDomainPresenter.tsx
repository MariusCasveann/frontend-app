import React, { useState } from 'react';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import { QueryAllDomains_allDomains } from '../../atoms/DomainSelection/graphql/__generated__/QueryAllDomains';
import MonthlyCostPerDomain from './MonthlyCostPerDomain';
import MonthlyCostPerStage from './MonthlyCostPerStage';
import { DeploymentStageEnum } from '../../../../model/__generated__/globalTypes';
import './MonthlyCostPerDomain.css';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';
import { MESSAGE_WHEN_NO_DATA } from '../../../../utils/constants';

interface MonthlyCostPerDomainPresenterProps {
    selectedDomain: QueryAllDomains_allDomains | undefined;
}

export default (props: MonthlyCostPerDomainPresenterProps) => {
    const { selectedDomain } = props;
    const [noDataForFirstWidget, setNoDataForFirstWidget] = useState<boolean>(false);
    const [noDataForSecondWidget, setNoDataForSecondWidget] = useState<boolean>(false);
    const [noDataForThirdWidget, setNoDataForThirdWidget] = useState<boolean>(false);

    if (noDataForFirstWidget && noDataForSecondWidget && noDataForThirdWidget) {
        return (
            <Card className="cost-per-domain-card" title="Cost per domain" width={45}>
                <p>{MESSAGE_WHEN_NO_DATA}</p>
            </Card>
        );
    }

    return (
        <FiltersContext.Consumer>
            {({ fromDate, toDate, financialYear }) => (
                <Card className="monthly-cost-per-domain-card" title="Product cost per domain" width={100}>
                    <div className="monthly-cost-per-domain-card">
                        <div className="chart">
                            {selectedDomain && (
                                <MonthlyCostPerDomain
                                    selectedDomainId={selectedDomain && selectedDomain.id}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                    setNoDataFlag={setNoDataForFirstWidget}
                                    financialYear={financialYear}
                                />
                            )}
                        </div>
                        <div className="numbers-container">
                            <MonthlyCostPerStage
                                selectedDomainId={selectedDomain && selectedDomain.id}
                                stage={DeploymentStageEnum.DEV}
                                fromDate={fromDate}
                                toDate={toDate}
                                setNoDataFlag={setNoDataForSecondWidget}
                                financialYear={financialYear}
                            />
                            <MonthlyCostPerStage
                                selectedDomainId={selectedDomain && selectedDomain.id}
                                stage={DeploymentStageEnum.PROD}
                                fromDate={fromDate}
                                toDate={toDate}
                                setNoDataFlag={setNoDataForThirdWidget}
                                financialYear={financialYear}
                            />
                        </div>
                    </div>
                </Card>
            )}
        </FiltersContext.Consumer>
    );
};
