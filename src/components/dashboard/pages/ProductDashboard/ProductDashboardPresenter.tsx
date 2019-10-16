import * as React from 'react';
import { CardLayout } from '../../../common/molecules/CardLayout/CardLayout';
import AccumulatedProductCostPresenter from '../../molecules/AccumulatedProductCost/AccumulatedProductCostPresenter';
import CpuUtilizationPresenter from '../../molecules/CpuUtilization/CpuUtilizationPresenter';
import '../common/Dashboard.css';
import { ProductFiltersPresenter } from './ProductFiltersPresenter';
import { useState } from 'react';
import { QueryAllProducts_allProducts } from '../../atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import { getCurrentDate, getYesterdayDate } from '../../../../utils/fiscalYear';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';
import DeploymentFrequencyPerProductPresenter from '../../molecules/DeploymentFrequencyPerProduct/DeploymentFrequencyPerProductPresenter';
import CostPerProductPresenter from '../../molecules/CostPerProduct/CostPerProductPresenter';

export default () => {
    const [selectedProductState, setSelectedProduct] = useState<QueryAllProducts_allProducts | undefined>(undefined);
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
                    <ProductFiltersPresenter
                        selectedProduct={selectedProductState}
                        setSelectedProduct={setSelectedProduct}
                    />
                    <AccumulatedProductCostPresenter selectedProduct={selectedProductState} />
                    <DeploymentFrequencyPerProductPresenter selectedProduct={selectedProductState} />
                    <CardLayout width={100}>
                        <CostPerProductPresenter selectedProduct={selectedProductState} />
                        <CpuUtilizationPresenter selectedProduct={selectedProductState} />
                    </CardLayout>
                </CardLayout>
            </div>
        </FiltersContext.Provider>
    );
};
