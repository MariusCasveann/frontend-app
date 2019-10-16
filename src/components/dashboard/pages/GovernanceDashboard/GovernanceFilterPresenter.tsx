import React from 'react';
import { Card } from '../../../common/molecules/CardLayout/CardLayout';

import { FinancialYearSelectPresenter } from '../../atoms/Filters/FinancialYearSelectPresenter';

export default () => (
    <Card title="Filter by financial year" width={100}>
        <FinancialYearSelectPresenter />
    </Card>
);
