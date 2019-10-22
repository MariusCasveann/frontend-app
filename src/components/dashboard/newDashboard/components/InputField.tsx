import * as React from 'react';
import { UserConsumer } from '../UserContext';

interface InputFieldProps {
    placeholder: string;
}

export const InputField = (props: InputFieldProps) => {
    return (
        <UserConsumer>
            {value => {
                return (
                    <>
                        <input
                            maxLength={20}
                            onChange={value.checkInput}
                            placeholder={props.placeholder}
                            type="text"
                            value={value.inputValue}
                        />
                    </>
                );
            }}
        </UserConsumer>
    );
};
