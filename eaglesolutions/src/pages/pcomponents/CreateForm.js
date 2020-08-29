import React, { Component } from 'react';
import '../../css/account.css';
import { NavLink } from 'react-router-dom';

export default class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: '',
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <div className="account-form">
                <h1>
                    Eagle Solutions
                </h1>
                <h2> 
                    Create an Account
                </h2>
                <form>
                    <input type="text" value={this.state.Name} placeholder="Name" onChange={this.handleChange} />
                    <br />
                    <input type="text" value={this.state.email} placeholder="Email" onChange={this.handleChange}/>
                    <br />
                    <input type="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
                    <br />
                    <NavLink to="login">
                        Already have an account?
                    </NavLink>
                    <br />
                    <br />
                    <input type="submit" value="Login" />
                    <br />
                </form> 
            </div>
        )
    }
}
