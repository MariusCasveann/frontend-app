import React from 'react';
import NumberDisplay from '../../../common/molecules/NumberDisplay/NumberDisplay';
import { DeploymentStageEnum } from '../../../../model/__generated__/globalTypes';
import LoadingOrErrorPresenter from '../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter';
import './MonthlyCostPerDomain.css';
import { MESSAGE_WHEN_NO_DATA } from '../../../../utils/constants';

interface MonthlyCostPerStageProps {
    currency: string;
    error: string;
    loading: boolean;
    stage: DeploymentStageEnum;
    value: number;
}

export default ({ currency, stage, value, error, loading }: MonthlyCostPerStageProps) => {
    if (loading || error) {
        return <LoadingOrErrorPresenter error={error} loading={loading} />;
    }
    if (value > 0) {
        return <NumberDisplay currency={currency} value={value} label={stage} />;
    }
    return <p>{MESSAGE_WHEN_NO_DATA}</p>;
};
