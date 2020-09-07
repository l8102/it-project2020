import React from "react";
import { NavLink } from "react-router-dom";

export default function Landing() {
    
    return (
        <div className="landing-container">
            <NavLink to="portfolio">
                Portfolio
            </NavLink>
            <NavLink to="account">
                Account
            </NavLink>
        </div>
    );
}