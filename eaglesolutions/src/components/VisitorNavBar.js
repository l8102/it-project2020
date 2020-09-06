import React from "react";
import {NavLink} from "react-router-dom";
// todo add css file

export default function NavBar() {
  return (
    <div className="nav_bar">
      <h2> Eagle ePortfolio </h2>
      <nav>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </div>
  )
}