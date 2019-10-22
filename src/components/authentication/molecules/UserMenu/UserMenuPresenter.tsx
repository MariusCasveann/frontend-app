import * as React from 'react';
import { Icon } from 'antd';
import './UserMenu.css';

export default () => {
    return (
        <div className="user-menu" style={{ display: 'block' }}>
            <p style={{ fontWeight: 'bold', fontSize: 18 }}>Marius Casvean</p>
            <p style={{ marginTop: -38 }}>
                <Icon type="mail" style={{ fontSize: 12, color: '#08c', marginRight: 3 }} theme="outlined" />
                marius.casvean@accesa.eu
            </p>
        </div>
    );
};
