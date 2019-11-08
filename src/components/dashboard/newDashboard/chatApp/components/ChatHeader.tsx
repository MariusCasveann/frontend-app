import * as React from 'react';
import { useState } from 'react';
import { Icon } from 'antd';
import moment from 'moment';
import { UserType } from '../mockDataForChat';

const headerStyle = {
    backgroundColor: 'grey',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 5px 0 5px'
};

interface HeaderProps {
    currentUser: UserType;
}

export const ChatHeader = (props: HeaderProps) => {
    const { firstname, lastname } = props.currentUser;
    const [currentTime, setCurrentTime] = useState<string>('');

    setInterval(() => {
        return setCurrentTime(`${moment().format('LTS')}`);
    }, 1000);

    return (
        <div style={headerStyle}>
            <h2>CHAT PLATFORM</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'white', marginRight: 30, marginBottom: 0 }}>
                    <Icon type="user" />{' '}
                    <b>
                        {firstname} {lastname}
                    </b>
                </h3>
                <p style={{ margin: 0, color: 'white' }}>Time: {currentTime}</p>
            </div>
        </div>
    );
};
