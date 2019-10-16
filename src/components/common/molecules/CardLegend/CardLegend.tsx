import * as React from 'react';
import { Typography } from 'antd';
import './CardLegend.css';

interface CardLegendProps {
    labels: Array<string | string[]> | undefined;
    colors: string[];
}

export const CardLegend = ({ labels, colors }: CardLegendProps) => (
    <div className="legend-container">
        {labels &&
            labels.map((label: string | string[], index) => (
                <Typography.Paragraph key={index}>
                    <span className="row-rect" style={{ backgroundColor: `${colors[index]}` }} />
                    {label}
                </Typography.Paragraph>
            ))}
    </div>
);
