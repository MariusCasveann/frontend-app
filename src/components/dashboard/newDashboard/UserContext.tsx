import * as React from 'react';

export interface ContextTypeData {
    inputValue: string;
    country: string;
    number: number;
    checkInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserContext = React.createContext<ContextTypeData>({
    inputValue: 'defaultInputValue',
    country: 'defaultCountry',
    number: 0,
    checkInput: () => null
});

// React.createContext(true);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;
