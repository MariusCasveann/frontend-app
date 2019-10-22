import * as React from 'react';
import classnames from 'classnames';
import { useEffect, useState } from 'react';

interface testProps {
    name?: string;
    age?: number;
    className?: string;
}

export default (props: testProps) => {
    const { age, name, className } = props;
    const [contor, setContor] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        text();
        // console.log('apel functia text()');
    }, [show]);

    useEffect(() => {
        if (contor > 5) {
            setShow(true);
        } else {
            setShow(false);
        }
        // console.log('check contor change: ', contor);
    });

    const text = () => {
        if (show) {
            return <p>The contor has reached the limit</p>;
        } else {
            return <p>Contor loading...</p>;
        }
    };

    const contorUp = () => {
        setContor(contor + 1);
    };

    const contorDown = () => {
        setContor(contor - 1);
    };

    return (
        <div className="purple-border">
            <h3>
                Welcome <b>{name || 'guest'}</b> to our website.
            </h3>
            <p className={classnames(className)}>We are waiting for you {age} years now.</p>
            <button onClick={contorUp}>Contor +</button>
            <button onClick={contorDown}>Contor -</button> = {contor}
            {text()}
        </div>
    );
};
