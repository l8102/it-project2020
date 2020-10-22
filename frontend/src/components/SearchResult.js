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

    // If the portfolio is private, redirect to access code page
    if (this.state.isPrivate) {

      // Store the account Id temporarily
      sessionStorage.setItem("tempAccountId", this.props.accountId);

      // Navigate to the portfolio
      this.props.history.push("/enterAccessCode");

    // Otherwise redirect to view portfolio page
    } else {
      // Store the account Id
      sessionStorage.setItem("accountId", this.props.accountId);

      // Navigate to the portfolio
      this.props.history.push("/editPortfolio");
    }
  }

  render() {
    return(
      <div className="search-result">
        <button
          className="search-result-button"
          onClick={this.handleClick}
        >
        </button>
        <div className="search-result-label-background"/>
        <label className="search-result-label-text">
          {this.props.firstName + " " + this.props.lastName}
        </label>
        <img className="search-result-picture" src={this.props.profilePicture} alt="" />
      </div>

    )
  }
}

export default withRouter(SearchResult);