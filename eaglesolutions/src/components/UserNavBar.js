import React from "react";
import {NavLink} from "react-router-dom";
import "../css/Nav.css"

export default function UserNavBar() {
  return (
    <div className="nav-bar">
      <h2 className="nav-title"> Eagle ePortfolio </h2>
      <nav>
        <NavLink to="/account">My Account</NavLink>
        <NavLink exact to="/">Log Out</NavLink>
      </nav>
    </div>
  )
}