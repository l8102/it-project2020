import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import "../css/Landing.css"


export default class Landing extends Component {
    render() {
        return (
            <div className="landing-container">
                <NavLink to="browse">
                    <button>
                        Browse Portfolios
                    </button>
                </NavLink>
                <NavLink to="createAccount">
                    <button>
                        Create a New Account
                    </button>
                </NavLink>
                <NavLink to="login">
                    <button>
                        Login to an Existing Account
                    </button>
                </NavLink>
            </div>
        )
    }
}