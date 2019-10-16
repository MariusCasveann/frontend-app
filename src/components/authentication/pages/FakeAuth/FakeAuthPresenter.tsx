import React, { useState } from 'react';
import './FakeAuth.css';

export interface FakeAuthProps {
    onSubmit: (token: string) => void;
}
export default ({ onSubmit }: FakeAuthProps) => {
    const [token, setToken] = useState('');
    return (
        <div id="fakeAuth">
            <form onSubmit={() => onSubmit(token)}>
                <label>
                    <b>Token</b>
                </label>
                <input type="text" value={token} onChange={event => setToken(event.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
