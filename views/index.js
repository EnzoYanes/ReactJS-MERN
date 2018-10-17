import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import NavBar from './NavBar';
import SideBar from './SideBar';
import Tasks from './Tasks';
import Home from './Home';
import Register from './Register';

render(
    <HashRouter>
        <div>
            <NavBar/>
            <SideBar/>
            <div style={{paddingLeft:300}}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/tasks' component={Tasks} />
                    <Route path='/register' component={Register} />
                </Switch>
            </div>
        </div>
    </HashRouter>,
    document.getElementById('app')
);