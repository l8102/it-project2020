import React, { useState } from 'react';
import '../../css/account.css';
import { NavLink } from 'react-router-dom';

export default function CreateForm() {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (name !== '' && email !== '' && password !== '') {
            // Validate account creation
            console.log(email + "has created an acount");
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
                Create an Account
            </h2>
            <form onSubmit={ handleSubmit }>
                <input type="text" value={ name } placeholder="Name" onChange={ e => setName(e.target.value) } />
                <input type="text" value={ email } placeholder="Email" onChange={ e => setEmail(e.target.value) }/>
                <input type="password" value={ password} placeholder="Password" onChange={ e => setPassword(e.target.value)} />
                <NavLink to="login">
                    Already have an account?
                </NavLink>
                <br />
                <input type="submit" value="Login" />
            </form> 
        </div>
    )
}