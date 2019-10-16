import * as React from 'react';
import { CardLayout, Card } from './../CardLayout';
import renderer from 'react-test-renderer';

const mockWidth = 30;
const mockChildren = <div>Hello</div>;

describe('Card', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Card children={mockChildren} width={mockWidth} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Card', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(
                <CardLayout width={mockWidth}>
                    <Card children={mockChildren} width={mockWidth} />
                </CardLayout>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
