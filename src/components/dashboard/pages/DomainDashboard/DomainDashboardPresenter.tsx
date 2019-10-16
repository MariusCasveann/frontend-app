import * as React from 'react';
import { CardLayout } from '../../../common/molecules/CardLayout/CardLayout';
import DomainRessourcesPresenter from '../../molecules/DomainRessources/DomainRessourcesPresenter';
import CostPerDomainPresenter from '../../molecules/CostPerDomain/CostPerDomainPresenter';
import MonthlyCostPerDomainPresenter from '../../molecules/MonthlyCostPerDomain/MonthlyCostPerDomainPresenter';
import ProductCostPresenter from '../../molecules/ProductCost/ProductCostPresenter';
import '../common/Dashboard.css';
import DeploymentFrequencyPerDomainPresenter from '../../molecules/DeploymentFrequencyPerDomain/DeploymentFrequencyPerDomainPresenter';
import { DomainFiltersPresenter } from './DomainFiltersPresenter';
import { useState } from 'react';
import { QueryAllDomains_allDomains } from '../../atoms/DomainSelection/graphql/__generated__/QueryAllDomains';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';
import { getCurrentDate, getYesterdayDate } from '../../../../utils/fiscalYear';

export default () => {
    const [selectedDomainState, setSelectedDomain] = useState<QueryAllDomains_allDomains | undefined>(undefined);
    const [fromDateState, setFromDate] = useState<string>(getYesterdayDate());
    const [toDateState, setToDate] = useState<string>(getCurrentDate());
    const [financialYearState, setFinancialYear] = useState<string | null>(null);

    return (
        <FiltersContext.Provider
            value={{
                fromDate: fromDateState,
                toDate: toDateState,
                setToDate,
                setFromDate,
                financialYear: financialYearState,
                setFinancialYear
            }}
        >
            <div className="dashboard-wrapper">
                <CardLayout width={100} className="dashboard-card-layout">
                    <DomainFiltersPresenter
                        selectedDomain={selectedDomainState}
                        setSelectedDomain={setSelectedDomain}
                    />
                    <DomainRessourcesPresenter selectedDomain={selectedDomainState} />
                    <ProductCostPresenter selectedDomain={selectedDomainState} />
                    <CardLayout width={100}>
                        <CostPerDomainPresenter selectedDomain={selectedDomainState} />
                        <DeploymentFrequencyPerDomainPresenter selectedDomain={selectedDomainState} />
                    </CardLayout>
                    <MonthlyCostPerDomainPresenter selectedDomain={selectedDomainState} />
                </CardLayout>
            </div>
        </FiltersContext.Provider>
    );
};
