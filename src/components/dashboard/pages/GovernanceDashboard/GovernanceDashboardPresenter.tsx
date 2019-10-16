import React, { useState } from 'react';
import { CardLayout } from '../../../common/molecules/CardLayout/CardLayout';
import GoogleCostPresenter from '../../molecules/GoogleCost/GoogleCostPresenter';
import DeploymentFrequencyPresenter from '../../molecules/DeploymentFrequency/DeploymentFrequencyPresenter';
import GovernanceFilterPresenter from './GovernanceFilterPresenter';
import { fiscalYear, fiscalYearEnd, fiscalYearStart } from '../../../../utils/fiscalYear';
import DomainCostPresenter from '../../molecules/DomainCost/DomainCostPresenter';
import '../common/Dashboard.css';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';
import { MESSAGE_NO_DATA_AVAILABLE_SELECT_ANOTHER_FINANCIAL_YEAR } from '../../../../utils/constants';

export default () => {
    const [fromDateState, setFromDate] = useState<string>(fiscalYearStart);
    const [toDateState, setToDate] = useState<string>(fiscalYearEnd);
    const [financialYearState, setFinancialYear] = useState<string | null>(fiscalYear.toString());

    return (
        <FiltersContext.Provider
            value={{
                fromDate: fromDateState,
                toDate: toDateState,
                setToDate,
                setFromDate,
                financialYear: financialYearState,
                setFinancialYear,
                messageWhenNoData: MESSAGE_NO_DATA_AVAILABLE_SELECT_ANOTHER_FINANCIAL_YEAR
            }}
        >
            <div className="dashboard-wrapper">
                <GovernanceFilterPresenter />
                <CardLayout width={100} className="dashboard-card-layout">
                    <GoogleCostPresenter />
                    <DomainCostPresenter />
                    <DeploymentFrequencyPresenter />
                </CardLayout>
            </div>
        </FiltersContext.Provider>
    );
};
