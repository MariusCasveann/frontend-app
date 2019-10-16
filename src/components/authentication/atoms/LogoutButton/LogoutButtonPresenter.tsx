import React from 'react';
import './LogoutButton.css';

const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
};

export default () => (
    <span className="logout-button" onClick={logout}>
        Logout
    </span>
);
