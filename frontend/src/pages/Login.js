import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import "../css/Account.css";
import { login } from "../Api.js"
import GoogleLogin from "react-google-login";
import GoogleLoginBtn from "../components/GoogleLoginBtn";

 class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginForm = this.loginForm.bind(this);
    }

    // Renders page for logging in
    render() {
        return (
            <div className="account-container">
                <div className="form-container">
                    <this.loginForm/>
                </div>
            </div>
        )
    }

    // Function handles change in input on the login form
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    // Function handles submission of login form to the database
    // todo removed async, maybe add back in
    async handleSubmit(e) {
        e.preventDefault();

        const loginDetails = {
            email: this.state.email,
            password: this.state.password
        }

        let res;

        try {
            res = await login(loginDetails);
        } catch (error) {
            console.error(error)
        }

        // if there is a valid response, redirect to the edit portfolio page
        // also store the account id
        if (res != null) {
            if(res.data !== "False") {
                sessionStorage.setItem("accountId", res.data);
                this.props.history.push("/portfolio");
            } else {
                alert("Invalid login credentials")
            }
        }

    }

    // Function represents form for entering an email & password for logging into the website
    loginForm() {
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
                    <GoogleLoginBtn className="google-button"/>
                    <NavLink className="nav-link" to="/create-account">
                        Create an account
                    </NavLink>
                </form> 
            </div> )
    }
} 
export default withRouter(Login);
