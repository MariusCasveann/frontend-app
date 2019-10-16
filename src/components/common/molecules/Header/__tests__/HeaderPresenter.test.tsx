import * as React from 'react';
import renderer from 'react-test-renderer';
jest.mock('backoffice-shared-components', () => ({ Icon: 'Icon' }));
jest.mock('./../../../../authentication', () => ({ UserMenu: 'UserMenu' }));
import HeaderPresenter from './../HeaderPresenter';

describe('Render header', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<HeaderPresenter />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
