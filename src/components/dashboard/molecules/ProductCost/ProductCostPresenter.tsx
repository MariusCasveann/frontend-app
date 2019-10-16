import React from 'react';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import { QueryAllDomains_allDomains } from '../../atoms/DomainSelection/graphql/__generated__/QueryAllDomains';
import ProductCostWidget from './ProductCostWidget';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';

interface ProductCostPresenterProps {
    selectedDomain: QueryAllDomains_allDomains | undefined;
}

export default ({ selectedDomain }: ProductCostPresenterProps) => (
    <FiltersContext.Consumer>
        {({ fromDate, toDate, financialYear }) => (
            <Card className="product-cost-card" title="Product cost" width={100}>
                {selectedDomain && (
                    <ProductCostWidget
                        fromDate={fromDate}
                        financialYear={financialYear}
                        toDate={toDate}
                        selectedDomaintId={selectedDomain && selectedDomain.id}
                    />
                )}
            </Card>
        )}
    </FiltersContext.Consumer>
);
