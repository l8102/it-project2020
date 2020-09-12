import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "../css/Account.css";
import { responseGoogle, responseFailGoogle } from "../Api.js"
import GoogleLogin from "react-google-login";



export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createAccountForm = this.createAccountForm.bind(this);
    }

    render() {
        return (
            <div className="account-container">
                <div className="form-container">
                    <this.createAccountForm />
                </div>
            </div>
        )
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }); 
    }

    handleSubmit(e) {
        e.preventDefault();
        // Needs to be completed 
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
                    <div className="name-field">
                        <input 
                            name="firstName" 
                            style={{ marginRight:"10px" }} 
                            type="text" 
                            value={ this.state.firstName } 
                            placeholder="First name" 
                            onChange={ this.handleChange } />
                        <input 
                            name="lastName" 
                            type="text" 
                            value={ this.state.lastName } 
                            placeholder="Last name" 
                            onChange={ this.handleChange } />
                    </div>
                    <input 
                        name="email" 
                        type="text" 
                        value={ this.state.email } 
                        placeholder="Email" 
                        onChange={ this.handleChange } />
                    <input 
                        name="password" 
                        type="password" 
                        value={ this.state.password} 
                        placeholder="Password" 
                        onChange={ this.handleChange } />
                    <input 
                        type="submit" 
                        value="Login" />

                    <NavLink className="nav-link" to="login">

        

                    <GoogleLogin
                        clientId="897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com"
                        buttonText="Create Account with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseFailGoogle}
                        cookiePolicy={'single_host_origin'}
                     />
                        Already have an account?
                    </NavLink>
                </form> 
            </div>)
    }
}

