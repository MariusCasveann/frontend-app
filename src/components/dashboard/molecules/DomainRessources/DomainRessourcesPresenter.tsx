import React from 'react';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';
import { QueryAllDomains_allDomains } from '../../atoms/DomainSelection/graphql/__generated__/QueryAllDomains';
import DomainRessourcesWidget from './DomainRessourcesWidget';
import { FiltersContext } from '../../atoms/Filters/FiltersContext';

interface DomainRessourcesPresenterProps {
    selectedDomain: QueryAllDomains_allDomains | undefined;
}

export default ({ selectedDomain }: DomainRessourcesPresenterProps) => (
    <FiltersContext.Consumer>
        {({ fromDate, toDate, financialYear }) => (
            <Card className="domain-ressources-card" title="Accumulated domain cost" width={100}>
                <DomainRessourcesWidget
                    fromDate={fromDate}
                    financialYear={financialYear}
                    toDate={toDate}
                    selectedDomaintId={selectedDomain && selectedDomain.id}
                />
            </Card>
        )}
    </FiltersContext.Consumer>
);
