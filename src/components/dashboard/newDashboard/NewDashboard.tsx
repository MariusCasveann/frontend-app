import * as React from 'react';
import { useState } from 'react';
import { Button, Icon, Tooltip } from 'antd';
import { Header } from './components/Header';
import { Table as MyTable } from './components/Table';
import './Dashboard.css';
import { UserProvider } from './UserContext';
import { ContextTypeData } from './UserContext';
// import TestComponent from './components/TestComponent';

export const NewDashboard = () => {
    const [inputValue, setInputValue] = useState<string>('');

    let checkInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const data: ContextTypeData = {
        checkInput: checkInput,
        inputValue: inputValue,
        country: 'Romania',
        number: 100
    };

    return (
        <UserProvider value={data}>
            <div className="bg-lightgrey">
                <Tooltip placement="right" title="Go to Google page">
                    <Button
                        onClick={() => window.open('https://www.google.com')}
                        style={{ position: 'absolute', top: 10 }}
                        className="bg-lightblue home-btn"
                        shape="round"
                    >
                        <Icon type="google" style={{ fontSize: '16px', color: '#08c' }} theme="outlined" />
                        Google
                    </Button>
                </Tooltip>
                <h3 style={{ textAlign: 'center' }}>Users list</h3>
                <Header />
                <MyTable />
                {/* <TestComponent age={22} /> */}
            </div>
        </UserProvider>
    );
};
