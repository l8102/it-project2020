import React from "react";
import { NavLink } from "react-router-dom";
import "../css/portfolio.css";

export default function Landing() {
    
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
        
    );
}