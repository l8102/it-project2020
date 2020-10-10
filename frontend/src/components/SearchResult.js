import React, {Component} from 'react';
import "../css/Browse.css";
import { withRouter } from 'react-router-dom';

class SearchResult extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // Handles when a search result is clicked
  handleClick(e) {

    // Prevent it being automatically clicked on load
    e.preventDefault();

    // Store the account Id
    sessionStorage.setItem("accountId", this.props.accountId);

    // Navigate to the portfolio
    this.props.history.push("/portfolio");
  }

  render() {
    return(
      <div className="search-result">
        <button
          className="search-result-button"
          onClick={this.handleClick}
        >
        </button>
        <label className="search-result-label">
          {this.props.firstName + " " + this.props.lastName}
        </label>
        {/*<img src={this.props.profileImage}/>*/}
      </div>

    )
  }
}

export default withRouter(SearchResult);