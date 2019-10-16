import ShallowRenderer from 'react-test-renderer/shallow';
import * as React from 'react';

import { FiltersPresenter, generateOptions } from '../FiltersPresenter';

// tslint:disable-next-line:no-any
const _ShallowRenderer: any = ShallowRenderer;
const renderer = new _ShallowRenderer();

const tree = renderer.render(<FiltersPresenter />);

describe('FiltersPresenter', () => {
    it('renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });

    it('generateOptions should return the expected value', () => {
        const result = generateOptions(2002);
        expect(result).toMatchSnapshot();
    });
});
