import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Tasks from './views/Tasks';
import Home from './views/Home';

render(
    <HashRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/tasks' component={Tasks} />
        </Switch>
    </HashRouter>,
    document.getElementById('app')
);