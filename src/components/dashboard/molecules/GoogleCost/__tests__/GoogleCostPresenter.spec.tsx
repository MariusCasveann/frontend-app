import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import GoogleCostPresenter from '../GoogleCostPresenter';

jest.doMock('../../../atoms/Filters/FiltersContext', () => ({
    FiltersContext: 'FiltersContext',
    'FiltersContext.Consumer': 'FiltersContext.Consumer'
}));

// tslint:disable-next-line:no-any
const _ShallowRenderer: any = ShallowRenderer;
const renderer = new _ShallowRenderer();

const tree = renderer.render(<GoogleCostPresenter />);
const result = renderer.getRenderOutput();

describe('GoogleCostPresenter', () => {
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });
});
