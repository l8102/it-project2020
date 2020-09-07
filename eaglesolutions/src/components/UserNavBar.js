import React from "react";
import {NavLink} from "react-router-dom";
import "../css/Nav.css"

export default function UserNavBar() {
  return (
    <div className="nav-bar-container">
      <h1> Eagle ePortfolio </h1>
      <div className="nav-bar">
        <ul>
          <li><a href="/account">My Account</a></li>
          <li><a href="/">Log Out</a></li>
        </ul>
      </div>
    </div>
  )
}