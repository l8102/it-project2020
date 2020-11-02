import React, {Component} from 'react';
import "../css/Browse.css";
import {withRouter} from 'react-router-dom';
import {getPortfolio} from "../Api";

class SearchResult extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isPrivate: '',
      hasLoaded: ''
    }

    this.handleClick = this.handleClick.bind(this);
  }


  // When the component loads, set if the search results are private
  async componentDidMount() {

    // Signal that the component is loading
    // This ensures on a refresh it does not display prematurely
    this.setState({
      hasLoaded: false
    })

    let portfolio;

    try {
      portfolio = await getPortfolio(this.props.accountId);
    } catch (error) {
      console.log(error);
    }

    this.setState({
      isPrivate: portfolio.data.isPrivate,
      hasLoaded: true
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
      sessionStorage.setItem("accountIdTemp", this.props.accountId);
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
    if (this.state.hasLoaded) {
      return (
        <button
          className="search-result-button"
          onClick={this.handleClick}
        >
          <div className="picture-background">
            <img className="search-result-picture" src={this.props.profilePicture} alt=""/>
          </div>
          <label className="search-result-label">
            {this.props.firstName + " " + this.props.lastName}
          </label>
        </button>
      )
    } else {
      return (
        <div/>
      )
    }
  }
}

export default withRouter(SearchResult);