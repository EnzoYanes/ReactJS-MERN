import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Tasks from './Tasks';
import Home from './Home';
import Register from './Register';

render(
    <HashRouter>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/tasks' component={Tasks} />
            <Route path='/register' component={Register} />
        </Switch>
    </HashRouter>,
    document.getElementById('app')
);