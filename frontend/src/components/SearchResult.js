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

    // If the portfolio is private, redirect to access code page
    if (this.state.isPrivate) {

      // todo handle permission to view

      // Navigate to the portfolio
      this.props.history.push("/enterAccessCode");

    // Otherwise redirect to view portfolio page
    } else {

      // todo handle permission to view

      // Navigate to the portfolio
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