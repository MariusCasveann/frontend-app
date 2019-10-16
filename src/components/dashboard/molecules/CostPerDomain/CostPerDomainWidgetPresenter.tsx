import React from 'react';
import NumberDisplay, { NumberType } from '../../../common/molecules/NumberDisplay/NumberDisplay';
import { DeploymentStageEnum } from '../../../../model/__generated__/globalTypes';
import LoadingOrErrorPresenter from '../../../common/organisms/LoadingOrError/LoadingOrErrorPresenter';
import './CostPerDomain.css';
import { MESSAGE_WHEN_NO_DATA } from '../../../../utils/constants';

interface CostPerDomainPresenterProps {
    error: string;
    loading: boolean;
    stage: DeploymentStageEnum;
    value: number;
}

export default ({ stage, value, error, loading }: CostPerDomainPresenterProps) => {
    if (loading || error) {
        return <LoadingOrErrorPresenter error={error} loading={loading} />;
    }
    if (value > 0) {
        return (
            <div className="numbers-container">
                <NumberDisplay value={value} type={NumberType.currency} label={stage} />
            </div>
        );
    }
    return <p>{MESSAGE_WHEN_NO_DATA}</p>;
};
