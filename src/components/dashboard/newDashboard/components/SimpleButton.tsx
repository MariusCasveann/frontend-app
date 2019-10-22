import * as React from 'react';
import { Button } from 'antd';
import { UserConsumer } from '../UserContext';

interface SimpleButtonProps {
    disabled?: boolean;
    label?: string;
    style?: object;
    icon?: any;
    size?: 'small' | 'default' | 'large';
    shape?: 'round' | 'circle' | 'circle-outline';
    callbackOnClick: any;
}

export const SimpleButton = (props: SimpleButtonProps) => {
    const { callbackOnClick, disabled, icon, label, shape, size, style } = props;

    return (
        <UserConsumer>
            {value => {
                return (
                    <div className="bg-lightgrey">
                        <Button
                            disabled={disabled}
                            size={size || 'small'}
                            shape={shape || 'round'}
                            style={style}
                            onClick={callbackOnClick}
                        >
                            {icon}
                            {label}
                        </Button>
                    </div>
                );
            }}
        </UserConsumer>
    );
};
