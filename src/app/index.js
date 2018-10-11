import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Tasks from './views/Tasks';
import Home from './views/Home';
import Register from './views/Register';

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