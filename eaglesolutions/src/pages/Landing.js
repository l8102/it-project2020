import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import "../css/landing.css"

export default class Landing extends Component {
    render() {
        return (
            <div className="landing-container">
                <h1>
                    Eagle Solutions
                </h1>
                <div className="nav-buttons-temp">
                    <NavLink className="nav-link" to="browse">
                        <button>
                            Browse Portfolios
                        </button>
                    </NavLink>
                    <NavLink className="nav-link" to="account">
                        <button>
                            Create a New Account
                        </button>
                    </NavLink>
                    <NavLink className="nav-link" to="login">
                        <button>
                            Login to an Existing Account
                        </button>
                    </NavLink> 
                </div>
            </div>
        )
    }
}