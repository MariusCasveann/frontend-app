import ShallowRenderer from 'react-test-renderer/shallow';
import * as React from 'react';
import { DomainFiltersPresenter } from '../DomainFiltersPresenter';
import { mockSelectedDomain } from '../../../../common/mock/MockData';

// tslint:disable-next-line:no-any
const _ShallowRenderer: any = ShallowRenderer;
const renderer = new _ShallowRenderer();

const tree = renderer.render(
    <DomainFiltersPresenter setSelectedDomain={() => false} selectedDomain={mockSelectedDomain} />
);

describe('DomainFiltersPresenter', () => {
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });
});
