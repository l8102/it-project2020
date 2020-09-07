import React from "react";
import {NavLink} from "react-router-dom";
import "../css/Nav.css"

export default function NavBar() {
  return (
    <div className="nav-bar">
      <h2 className="nav-title"> Eagle ePortfolio </h2>
      <nav>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </div>
  )
}