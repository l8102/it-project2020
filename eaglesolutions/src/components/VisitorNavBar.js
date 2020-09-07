import React from "react";
import {NavLink} from "react-router-dom";
import "../css/Nav.css"

export default function VisitorNavBar() {
  return (
    <div className="nav-bar-container">
      <h1> Eagle ePortfolio </h1>
      <div className="nav-bar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/browse">Browse</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </div>
    </div>
  )
}
