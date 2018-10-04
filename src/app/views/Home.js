import React, {Component} from 'react';
import axios from 'axios';

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    login(e){
        axios.post('/api/tasks/login', this.state)
            .then(M.toast({html: 'User or Password incorrect'}))
            .catch(err => console.error(err));
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <h1>Bienvenidos!</h1>
                        <form onSubmit={this.login}>
                            <input name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="username" />
                            <input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="password" />

                            <button type="submit" className="btn light-blue darken-4">Iniciar</button>
                            <a className="btn light-blue darken-4 right" href="#/register">Registrarse</a>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Home;