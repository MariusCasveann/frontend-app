import * as React from 'react';
import renderer from 'react-test-renderer';
// components
import PageNotFoundPresenter from '../PageNotFound';

describe('PageNotFoundPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<PageNotFoundPresenter />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
