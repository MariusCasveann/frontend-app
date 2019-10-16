import React from 'react';
import { FiltersPresenter } from '../../atoms/Filters/FiltersPresenter';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import DomainSelection from '../../atoms/DomainSelection/DomainSelection';
import { QueryAllDomains_allDomains } from '../../atoms/DomainSelection/graphql/__generated__/QueryAllDomains';

interface DomainFiltersPresenterProps {
    selectedDomain: QueryAllDomains_allDomains | undefined;
    setSelectedDomain: (value: QueryAllDomains_allDomains) => void;
}

export const DomainFiltersPresenter = ({ selectedDomain, setSelectedDomain }: DomainFiltersPresenterProps) => {
    return (
        <Card title="Filter" width={100}>
            <FiltersPresenter />
            <DomainSelection
                onDomainSelected={(value: QueryAllDomains_allDomains) => {
                    setSelectedDomain(value);
                }}
                selectedDomain={selectedDomain}
            />
        </Card>
    );
};
