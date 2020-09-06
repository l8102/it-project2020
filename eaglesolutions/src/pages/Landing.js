import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export default class Landing extends Component {
    render() {
        return (
            <div className="landing-container">
                <h1>
                    Eagle Solutions
                </h1>
                <NavLink to="portfolio">
                    Portfolio
                </NavLink>
                <NavLink to="account">
                    Account
                </NavLink>
            </div>
        )
    }
}