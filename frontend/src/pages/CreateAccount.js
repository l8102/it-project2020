import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import "../css/Account.css";
import { createAccount } from "../Api.js"
import GoogleLoginBtn from "../components/GoogleLoginBtn";

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.accountForm = this.accountForm.bind(this);
    }

    // Renders page for account creation
    render() {
        return (
            <div className="account-container">
                <div className="form-container">
                    <this.accountForm/>
                </div>
            </div>
        )
    }

    // Function handles change in input on the account creation form
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }); 
    }

    // Function handles submission of the account creation form to the database
    // todo removed async, could be added in later if necessary
    handleSubmit(e) {
        e.preventDefault();

        const account = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        }

        const res = createAccount(account);

        // todo still not sure if res is working as intended
        // If there is a valid response, redirect to login page
        if (res != null) {
            alert("Account created successfully");
            this.props.history.push("/login");
        } else {
            alert("ERROR: Failed to create account.");
        }

        // console.log(res);
    }

    // Function represents form for inputting account creation information
    accountForm(response = response) {
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
                        value="Create Account" />
                    <h3>
                        Or
                    </h3>
                    <GoogleLoginBtn className="google-button"/>
                    <NavLink className="nav-link" to="login">
                        Already have an account?
                    </NavLink>
                </form> 
            </div>)
    }
} 
export default withRouter(CreateAccount);


