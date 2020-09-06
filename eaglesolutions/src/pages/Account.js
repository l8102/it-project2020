import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "../css/account.css";


export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createAccountForm = this.createAccountForm.bind(this);
    }

    render() {
        return (
            <div className="account-container">
                <this.createAccountForm />
            </div>
        )
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }); 
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    createAccountForm() {
        return (
            <div className="account-form">
                <h1>
                    Eagle Solutions
                </h1>
                 <h2> 
                    Create an Account
                </h2>
                <form onSubmit={ this.handleSubmit }>
                    <input name="name" type="text" value={ this.state.name } placeholder="Name" onChange={ this.handleChange } />
                    <input name="email" type="text" value={ this.state.email } placeholder="Email" onChange={ this.handleChange }/>
                    <input name="password" type="password" value={ this.state.password} placeholder="Password" onChange={ this.handleChange } />
                    <NavLink to="login">
                        Already have an account?
                    </NavLink>
                    <br />
                    <input type="submit" value="Login" />
                </form> 
            </div>)
    }
}


