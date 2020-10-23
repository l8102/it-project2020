import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import "../css/Nav.css"
import Footer from "./Footer";

class UserNavBar extends Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  // On logout, wipe the stored account Id and permissions
  handleLogout() {
    sessionStorage.removeItem("permissionToEdit");
    sessionStorage.removeItem("accountId");
  }

  render() {
    return (
      <div>
        {/*This ensures content isn't hidden behind the nav bar*/}
        <div className="nav-bar-offset">
          Nav Bar Offset
        </div>
        <div className="nav-bar-container">
          <h1> Eagle ePortfolio </h1>
          <div className="nav-bar">
            <ul>
              <li><a href="/editPortfolio">My Portfolio</a></li>
              <li><a href="/" onClick={this.handleLogout}>Log Out </a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default UserNavBar;