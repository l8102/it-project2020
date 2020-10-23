import React, {Component} from 'react';
import "../css/Browse.css";
import SearchResult from "../components/SearchResult";
import {getAllAccountsByFullName, getAllAccounts} from "../Api";

class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountId: "",
      results: [],
      searchInput: "",
      profilePicture: undefined
    }

    // binding ensures that 'this' works properly
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // This runs when first initialised
  async componentDidMount() {
    console.log("running");
    let res;

    try {
      res = await getAllAccounts();
    } catch (error) {
      console.error(error);
    }

    // this needs to be called OUTSIDE of the function call, otherwise 'this.setState' points to the function
    // instead of the class
    this.setState({
      results: res.data
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // This runs when a new search is submitted
  async handleSubmit(e) {
    e.preventDefault();

    // todo could use res, not sure if necessary
    let res;

    // todo validate the input a bit more (for security reasons)
    // if there is no search input return all accounts
    if (this.state.searchInput === "") {
      res = await getAllAccounts();
    }
    // otherwise if there is a specific search input return specific accounts
    else {
      try {
        res = await getAllAccountsByFullName(this.state.searchInput);
      } catch (error) {
        console.error(error)
      }
    }

    // update the results
    this.setState(state => ({
      results: res.data,
    }));
  }

  render() {
    return (
      <div className="browse-container">
        <h2 className="browse-title"> Browse Portfolios </h2>
        <form onSubmit={ this.handleSubmit } className="search-bar">
          <input
            className="search-bar"
            type="text"
            name="searchInput"
            value={this.state.searchInput}
            placeholder="Search"
            onChange={ this.handleChange }
          />
        </form>
        <div className="results-container">
          {this.state.results.map((result) => (
            <SearchResult
              accountId = {result._id.toString()}
              firstName = {result.firstName}
              lastName = {result.lastName}
              profilePicture = {result.profilePicture}
            />
          ))}
        </div>
      </div>
    );
  }
}


export default Browse;