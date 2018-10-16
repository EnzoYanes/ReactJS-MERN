import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    addUser(e){
        fetch('/api/user/register', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/jason',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status){
                M.toast({html: data.status});
            }
            else{
                M.toast({html: 'Usuario creado'});   
                this.props.history.push("/");
            }
        })
        .catch(error => console.log(error));
        e.preventDefault();
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <h1>Registro</h1>
                        <form onSubmit={this.addUser}>
                            <input name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="username" required />
                            <input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="password" required/>

                            <button type="submit" className="btn light-blue darken-4">Crear</button>
                            <Link to={`/`} className="btn light-blue darken-4 right" >Inicio</Link>
                        </form>
                        
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Register;