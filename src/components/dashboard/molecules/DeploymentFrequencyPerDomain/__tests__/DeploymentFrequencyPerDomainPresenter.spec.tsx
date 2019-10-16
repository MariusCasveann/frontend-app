import * as React from 'react';
jest.mock('../../DeploymentFrequency/DeploymentFrequencyWidget', () => 'DeploymentFrequencyWidget');
import renderer from 'react-test-renderer';
import DeploymentFrequencyPerDomainPresenter from '../DeploymentFrequencyPerDomainPresenter';
import { mockSelectedDomain } from '../../../../common/mock/MockData';

describe('DeploymentFrequencyPerDomainPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<DeploymentFrequencyPerDomainPresenter selectedDomain={mockSelectedDomain} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
