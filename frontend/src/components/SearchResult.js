import React, {Component} from 'react';
import "../css/Browse.css";
import { withRouter } from 'react-router-dom';
import {getPortfolioIsPrivate} from "../Api";

class SearchResult extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPrivate: ''
    }

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const privacy = await getPortfolioIsPrivate(this.props.accountId);
    this.setState( {
      isPrivate: privacy.data.isPrivate
    })
  }

  // Handles when a search result is clicked
  handleClick(e) {

    // Prevent it being automatically clicked on load
    e.preventDefault();

    // Store the account Id
    sessionStorage.setItem("accountId", this.props.accountId);

    // If the portfolio is private
    if (this.state.isPrivate) {

      // Permission to view is not granted yet, instead
      // redirect to access code page
      this.props.history.push("/enterAccessCode");

    // Otherwise if the portfolio is not private
    } else {
      // store that the user has permission to view a specified profile
      sessionStorage.setItem("permissionToView",  this.props.accountId);
      // Navigate to the view portfolio page
      this.props.history.push("/viewPortfolio");
    }
  }

  render() {
    return(
      // <div className="search-result">
        <button
          className="search-result-button"
          onClick={this.handleClick}
        >
          <div className="picture-background">
            <img className="search-result-picture" src={this.props.profilePicture} alt="" />
          </div>
          <label className="search-result-label">
            {this.props.firstName + " " + this.props.lastName}
          </label>
        </button>

      // </div>
    )
  }
}

export default withRouter(SearchResult);