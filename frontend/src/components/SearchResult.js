import React, {Component} from 'react';
import "../css/Browse.css";
import { withRouter } from 'react-router-dom';
import {getPortfolio} from "../Api";

class SearchResult extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPrivate: ''
    }

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const portfolio = await getPortfolio(this.props.accountId);
    this.setState( {
      isPrivate: portfolio.data.isPrivate
    })
  }

  // Handles when a search result is clicked
  handleClick(e) {

    // Prevent it being automatically clicked on load
    e.preventDefault();

    // If the portfolio is private
    if (this.state.isPrivate) {

      // The user cannot view the account id yet,
      // Instead store the account id temporarily
      sessionStorage.setItem("accountIdTemp",  this.props.accountId);
      // Redirect to access code page
      this.props.history.push("/enterAccessCode");

    // Otherwise if the portfolio is not private
    } else {
      // Store the account id that the user can view
      sessionStorage.setItem("accountIdForView", this.props.accountId);
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