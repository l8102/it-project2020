import React, {Component} from 'react';
import "../css/Nav.css"

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.populateNavBar = this.populateNavBar.bind(this);
  }

  // On logout, wipe the stored account id for editing
  handleLogout() {
    sessionStorage.removeItem("accountIdForEdit");
  }

  // Returns the nav bar items in a list
  // Based on if the user is logged in or out
  populateNavBar() {

    // If the account id for editing is not null, then the user is logged in
    if (sessionStorage.getItem("accountIdForEdit") !== null) {
      // Return the nav list for a logged in user
      return (
        <ul>
          <li><a href="/" onClick={this.handleLogout}>Log Out </a></li>
          <li><a href="/editPortfolio">My Portfolio</a></li>
          <li><a href="/browse">Browse</a></li>
          <li><a href="/">Home</a></li>
        </ul>
      );

      // Otherwise if not logged in
    } else {
      // Return the nav list for a logged out user
      return (
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/browse">Browse</a></li>
          <li><a href="/">Home</a></li>
        </ul>
      );
    }

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
            {this.populateNavBar()}
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar;