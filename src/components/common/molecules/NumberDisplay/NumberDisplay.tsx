import * as React from 'react';
import { Typography } from 'antd';
import './NumberDisplay.css';

export enum NumberType {
    number = 'number',
    currency = 'currency',
    percentage = 'percent'
}
export interface NumberDisplayProps {
    value?: number;
    countryCode?: string;
    type?: NumberType;
    label: string;
    currency?: string;
}

export const getTypeDecorator = (type?: NumberType) => {
    switch (type) {
        case NumberType.percentage:
            return '%';
        case NumberType.currency:
            return ' EUR';
        case NumberType.number:
        default:
            return null;
    }
};

export default ({ currency, type, label, value }: NumberDisplayProps) => (
    <div className="number-display">
        <Typography.Title level={2} className="number-display-number">
            {value}
            {getTypeDecorator(type)} {currency}
        </Typography.Title>
        <Typography.Text className="number-display-label">{label}</Typography.Text>
    </div>
);
