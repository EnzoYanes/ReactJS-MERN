import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Home extends Component{
    render(){
        return(
            <div className="container">
                <h1>Bienvenidos!</h1>
                <a className="btn light-blue darken-4" href="#/tasks">Enter</a>
            </div>
        )
    }
}

export default Home;