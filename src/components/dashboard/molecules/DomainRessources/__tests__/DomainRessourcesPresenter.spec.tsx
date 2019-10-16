import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('./../DomainRessourcesWidget', () => 'DomainRessourcesWidget');
jest.mock('../../../../common/molecules/CardLayout/CardLayout', () => ({ Card: 'Card' }));
import DomainRessourcesPresenter from '../DomainRessourcesPresenter';
import { mockSelectedDomain } from '../../../../common/mock/MockData';

describe('DomainRessourcesPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<DomainRessourcesPresenter selectedDomain={mockSelectedDomain} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
