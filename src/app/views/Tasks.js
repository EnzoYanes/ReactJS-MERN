import React, {Component} from 'react';

class Tasks extends Component{

    constructor(props){
        super(props);
        this.state = {
            _id: '',
            title: '',
            description: '',
            tasks: []
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e){
        if (this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/jason',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Task updated'});
                this.setState({_id:'', title:'', description:''})
                this.fetchTasks();
            })
        }else{
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/jason',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: 'Task saved'});
                    this.setState({title: '',description:''});
                    this.fetchTasks();
                })
                .catch(err => console.error(err));
        }
        e.preventDefault();
    }

    componentDidMount(){
        this.fetchTasks();
    }

    fetchTasks(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
            });
    }

    deleteTask(id){
        if(confirm('Estas seguro de que quieres eliminar la tarea?')){
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers:{
                    'Accept': 'application/jason',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Task deleted'});
                this.fetchTasks();
            })
        }
    }

    editTask(id){
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    _id: data._id,
                    title: data.title,
                    description: data.description
                })
            })
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="App">
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                        <a className="brand-logo right" href="/" >Exit</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" value={this.state.title} onChange={this.handleChange} type="text" placeholder="Task title" />
                                            </div>
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder="Task description" className="materialize-textarea"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task =>{
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.editTask(task._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)} style={{margin: '4px'}}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Tasks;