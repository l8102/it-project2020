import React, { useState } from 'react';
import '../../css/account.css';
import { NavLink } from 'react-router-dom';

export default function LoginForm() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    

    function handleSubmit(e) {
        e.preventDefault();  
        if (email !== '' && password !== '') {
            // Validate login information
            console.log(email + " has attempted to login");
        } else {
            console.log("A required field is empty");
        }
    }

    return ( 
        <div className="account-form">
            <h1>
                Eagle Solutions
            </h1>
            <h2> 
                Login 
            </h2>
            <form onSubmit={ handleSubmit }>
                <input type="text" value={ email } placeholder="Email" onChange={e => setEmail(e.target.value) } />
                <input type="password" value={ password } placeholder="Password" onChange={ e => setPassword(e.target.value) } />
                <input type="submit" value="Login" />
                <br />
                <NavLink to="account">
                    Create an account
                </NavLink>
            </form> 
        </div>
    )
}