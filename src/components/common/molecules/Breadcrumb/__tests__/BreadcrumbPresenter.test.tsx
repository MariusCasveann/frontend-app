import * as React from 'react';
jest.doMock('antd', () => ({ 'Breadcrumb.Item': 'Breadcrumb.Item', Breadcrumb: 'Breadcrumb' }));

// components
import BreadcrumbPresenter from '../BreadcrumbPresenter';
import renderer from 'react-test-renderer';

describe('BreadcrumbPresenter', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<BreadcrumbPresenter />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
