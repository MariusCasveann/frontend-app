import * as React from 'react';
import { Icon } from 'antd';
import { InputField } from './InputField';
import '../Dashboard.css';

export const Header = () => {
    return (
        <div style={{ display: 'flex', padding: '10px 10px' }} className="bg-lightgrey m-t-10">
            <InputField placeholder="Search user" />
            <Icon type="search" style={{ marginTop: 7, marginLeft: 3 }} />
        </div>
    );
};
