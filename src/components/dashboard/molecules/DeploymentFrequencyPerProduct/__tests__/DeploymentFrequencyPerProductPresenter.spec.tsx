import * as React from 'react';
import renderer from 'react-test-renderer';
import { mockSelectedProduct } from '../../../../common/mock/MockData';

jest.mock('../../DeploymentFrequency/DeploymentFrequencyWidget', () => 'DeploymentFrequencyWidget');
jest.mock('../../../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card' }));

import DeploymentFrequencyPerProductPresenter from '../DeploymentFrequencyPerProductPresenter';

describe('DeploymentFrequencyPerProductPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<DeploymentFrequencyPerProductPresenter selectedProduct={mockSelectedProduct} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
