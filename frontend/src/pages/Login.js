import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "../css/Account.css";
import { responseGoogle, responseFailGoogle } from "../Api.js"
import GoogleLogin from "react-google-login";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createLoginForm = this.createLoginForm.bind(this);
    }

    render() {
        return (
            <div className="account-container">

                <NavLink to="/">
                    Landing
                </NavLink>
                <NavLink to="/portfolio">
                    Portfolio
                </NavLink>
                <div className="form-container">
                    <this.createLoginForm />
                </div>
            </div>
        )
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        // Needs to be completed   
    }

    createLoginForm() {
        return (
            <div className="account-form">
                <h1>
                    Eagle Solutions
                </h1>
                <h2> 
                    Login 
                </h2>
                <form onSubmit={ this.handleSubmit }>
                    <input 
                        name="email" 
                        type="text" 
                        value={ this.state.email } 
                        placeholder="Email" 
                        onChange={ this.handleChange }/>
                    <input 
                        name="password" 
                        type="password" 
                        value={ this.state.password } 
                        placeholder="Password" 
                        onChange={ this.handleChange } />
                    <input 
                        type="submit" 
                        value="Login" />
                    <h3> 
                           Or
                    </h3>
                    <GoogleLogin className="google-button"
                        clientId="897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseFailGoogle}
                        cookiePolicy={'single_host_origin'}
                     />
                    <NavLink className="nav-link" to="/account">
                        Create an account
                    </NavLink>
                </form> 
            </div> )
    }
}