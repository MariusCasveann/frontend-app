import React, { useState } from 'react';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import CostPerProductWidget from './CostPerProductWidget';
import { DeploymentStageEnum } from '../../../../model/__generated__/globalTypes';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';
import { MESSAGE_WHEN_NO_DATA } from '../../../../utils/constants';
import { QueryAllProducts_allProducts } from '../../atoms/ProductSelection/graphql/__generated__/QueryAllProducts';
import './CostPerProduct.css';

interface CostPerProductPresenterProps {
    selectedProduct: QueryAllProducts_allProducts | undefined;
}

export default ({ selectedProduct }: CostPerProductPresenterProps) => {
    const [noDataForFirstWidget, setNoDataForFirstWidget] = useState<boolean>(false);
    const [noDataForSecondWidget, setNoDataForSecondWidget] = useState<boolean>(false);

    if (noDataForFirstWidget && noDataForSecondWidget) {
        return (
            <Card className="cost-per-product-card" title="Cost per product" width={45}>
                <p>{MESSAGE_WHEN_NO_DATA}</p>
            </Card>
        );
    }

    return (
        <FiltersContext.Consumer>
            {({ fromDate, toDate, financialYear }) => (
                <Card className="cost-per-product-card" title="Cost per product" width={45}>
                    <div className="cost-per-product-card">
                        <div className="chart">
                            {selectedProduct && (
                                <CostPerProductWidget
                                    stage={DeploymentStageEnum.DEV}
                                    fromDate={fromDate}
                                    financialYear={financialYear}
                                    setNoDataFlag={setNoDataForFirstWidget}
                                    toDate={toDate}
                                    selectedProductId={selectedProduct && selectedProduct.id}
                                />
                            )}
                        </div>
                        <div className="chart">
                            {selectedProduct && (
                                <CostPerProductWidget
                                    stage={DeploymentStageEnum.PROD}
                                    fromDate={fromDate}
                                    financialYear={financialYear}
                                    setNoDataFlag={setNoDataForSecondWidget}
                                    toDate={toDate}
                                    selectedProductId={selectedProduct && selectedProduct.id}
                                />
                            )}
                        </div>
                    </div>
                </Card>
            )}
        </FiltersContext.Consumer>
    );
};
