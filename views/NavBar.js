import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {
    render() {
        return (
            <nav >
                <div className="nav-wrapper">
                    <ul class="right hide-on-med-and-down">
                        <li><Link to={'/'} className="waves-effect waves-light btn">Iniciar sesión</Link></li>
                        <li><Link to={'/register'} className="waves-effect waves-light btn">Registrarse</Link></li>
                        <li><Link to={'/'} className="waves-effect waves-light btn">Salir</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;