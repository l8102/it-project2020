import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import "../css/Account.css";
import { responseGoogle, responseFailGoogle, createAccount } from "../Api.js"
import GoogleLogin from "react-google-login";


class Account extends Component {
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
        this.accountForm = this.accountForm.bind(this);
    }

    // Renders page for account creation
    render() {
        return (
            <div className="account-container">
                <div className="form-container">
                    <this.accountForm />
                </div>
            </div>
        )
    }

    // Function handles change in input on the account creation form
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }); 
    }

    // Function handles submission of the account creation form to the database
    async handleSubmit(e) {
        e.preventDefault();

        var res;

        res = await createAccount(this.state);

        console.log(res);
        // Structure for handleSubmit method in account creation, needs to be completed
        /* 
        var res;

        // Form input is sent to the database
        res = await createAccount ({
            this.state.email,
            this.state.password,
            this.state.firstName,
            this.state.lastName
        })
        
        console.log(res.data);

        if(res != null) {
            // If the new account has been recorded in the database
            if(res.data == "True") {
                sessionStorage.setItem("accountID", res.data);
                // Redirects to portfolio page
                this.props.history.push("/portfolio");
            } else {
                alert("Account creation unsuccessful");
            }
        } 
        */
    }

    // Function represents form for inputting account creation information
    accountForm() {
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
                    <GoogleLogin
                        clientId="897229494960-nm4q7ik3qroekhmuccva0p20a0bnk00q.apps.googleusercontent.com"
                        buttonText="Create Account with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseFailGoogle}
                        cookiePolicy={'single_host_origin'}
                     />
                    <NavLink className="nav-link" to="login">
                        Already have an account?
                    </NavLink>
                </form> 
            </div>)
    }
} 
export default withRouter(Account);


