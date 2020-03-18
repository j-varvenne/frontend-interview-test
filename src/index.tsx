import * as React from 'react';
import { render } from 'react-dom';
import { App } from '@/components/App';
import './reset.scss';

render(
    <App />,
    document.getElementById('app'),
);