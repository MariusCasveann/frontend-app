import * as React from 'react';

import { CardLegend } from '../CardLegend';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('CardLegend', () => {
    it('renders correctly', () => {
        const renderer = ShallowRenderer.createRenderer();
        renderer.render(<CardLegend labels={[]} colors={[]} />);
        const result = renderer.getRenderOutput();
        expect(result).toMatchSnapshot();
    });
});
