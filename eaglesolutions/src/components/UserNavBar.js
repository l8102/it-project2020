import React from "react";
import {NavLink} from "react-router-dom";
// todo add css file

export default function UserNavBar() {
  return (
    <div className="nav_bar">
      <h2> Eagle ePortfolio </h2>
      <nav>
        <NavLink to="/account">My Account</NavLink>
        <NavLink exact to="/">Log Out</NavLink>
      </nav>
    </div>
  )
}