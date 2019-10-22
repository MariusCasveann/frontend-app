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

    // const dataSource = [
    //     {
    //         key: '1',
    //         name: 'Mike',
    //         age: 32,
    //         address: '10 Downing Street',
    //     },
    //     {
    //         key: '2',
    //         name: 'John',
    //         age: 42,
    //         address: '10 Downing Street',
    //     },
    // ];

    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         key: 'name',
    //     },
    //     {
    //         title: 'Age',
    //         dataIndex: 'age',
    //         key: 'age',
    //     },
    //     {
    //         title: 'Address',
    //         dataIndex: 'address',
    //         key: 'address',
    //     },
    //     {
    //         title: 'Actions',
    //         dataIndex: 'actions',
    //         key: 'actions'
    //     },
    // ];

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

                {/* import Table from antd when use <Table /> */}
                {/* <Table dataSource={dataSource} columns={columns} /> */}
                {/* <TestComponent age={22} /><hr/> */}
            </div>
        </UserProvider>
    );
};
