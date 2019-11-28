import * as React from 'react';
import { UserType } from './mockData';

export interface ContextTypeData {
    inputValue: string;
    country: string;
    number: number;
    selectedUser: UserType | null;
    checkInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserContext = React.createContext<ContextTypeData>({
    inputValue: 'defaultInputValue',
    country: 'defaultCountry',
    number: 0,
    selectedUser: null,
    checkInput: () => null
});

// React.createContext(true);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;
