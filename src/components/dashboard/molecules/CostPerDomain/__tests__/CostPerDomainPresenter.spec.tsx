import ShallowRenderer from 'react-test-renderer/shallow';
import * as React from 'react';
import CostPerDomainPresenter from './../CostPerDomainPresenter';
import { mockSelectedDomain } from '../../../../common/mock/MockData';

// tslint:disable-next-line:no-any
const _ShallowRenderer: any = ShallowRenderer;
const renderer = new _ShallowRenderer();

const tree = renderer.render(<CostPerDomainPresenter selectedDomain={mockSelectedDomain} />);
describe('CostPerDomainPresenter', () => {
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });
});
