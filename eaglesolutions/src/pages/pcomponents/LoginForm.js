import React, { Component } from 'react';
import '../../css/account.css';
import { NavLink } from 'react-router-dom';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Need to validate email and password through api


    handleChange(event) {
        this.setState({email: event.target.email, password: event.target.password});
    }

    handleSubmit(event) {
        alert('A user has attempted to login: ' + this.state.email);
        event.preventDefault();
    }  
    
    render() {
        return (
            <div className="account-form">
                <h1>
                    Eagle Solutions
                </h1>
                <h2> 
                    Login 
                </h2>
                <form>
                    <input type="text" value={this.state.email} placeholder="Email" onChange={this.handleChange} />
                    <br />
                    <input type="password" value={this.state.password} placeholder="Password" onChange={this.handleChange}/>
                    <br />
                    <input type="submit" value="Login" />
                    <br />
                    <NavLink to="account">
                        Create an account
                    </NavLink>
                </form> 
            </div>
        )
    }
}


