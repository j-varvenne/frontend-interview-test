import * as React from 'react';
import { SFC } from 'react';
import { Polynomial } from './Polynomial';
import * as style from './App.module.scss';


// tslint:disable-next-line: variable-name
export const App: SFC<Props> = ({}) => {

    const [inputValue, setInputValue] = React.useState('x ^ 2');

    return <div className={style.container}>
        <input className={style.input} value={inputValue} onChange={ev => setInputValue(ev.target.value)} />
        <Polynomial input={inputValue} />
    </div>
};

interface Props {}
