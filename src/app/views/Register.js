import React, {Component} from 'react';

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
        fetch('/api/tasks/register', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/jason',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html: 'User created'});
            this.props.history.push("/");
        })
        .catch(error => console.error(error));
        e.preventDefault();
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <h1>Registro</h1>
                        <form onSubmit={this.addUser}>
                            <input name="username" value={this.state.username} onChange={this.handleChange} type="text" placeholder="username" />
                            <input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="password" />

                            <button type="submit" className="btn light-blue darken-4">Crear</button>
                        </form>
                        
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Register;