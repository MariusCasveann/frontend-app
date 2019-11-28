import * as React from 'react';
import { useState } from 'react';
import { Login } from './LoginComponent';
import { Appointments } from './AppointmentsComponent';
import { mockUsers } from '../mockDataForCheckMe';
import '../checkMe.css';

const pageStyle = {
    height: '90vh',
    padding: 10
};

export const CheckMeApplication = () => {
    const [userLogged, setUserLogged] = useState<any>(JSON.parse(`${localStorage.getItem('userLogged')}`));
    const currentUser = mockUsers.find(user => userLogged && user.username === userLogged.username);

    return (
        <div style={pageStyle}>
            {!userLogged ? (
                // @ts-ignore
                <Login callbackOnSubmit={setUserLogged} />
            ) : (
                <Appointments callbackOnLogout={setUserLogged} currentUser={currentUser} userLogged={userLogged} />
            )}
        </div>
    );
};
