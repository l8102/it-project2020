import React, {Component} from 'react';
import "../css/Browse.css";
import { } from "../Api.js"
import SearchResult from "../components/SearchResult";
import {setPortfolioContactInfo} from "../Api";

// todo this is just for testing, remove later
const allAccounts = [
  {
    accountId: "5f74548fdfca334fae0ecad2",
    firstName: "Bob",
    lastName: "Smith",
    profileImage: undefined
  },
  {
    accountId: "5f74548fdfca334fae0ecad2",
    firstName: "Frank",
    lastName: "Smith",
    profileImage: undefined
  }
];

class Browse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountId: "",
      results: [],
      searchInput: "",
      profileImage: undefined
    }

    // binding ensures that 'this' works properly
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("running");
    let res;

    try {
      // res = await getAccounts();
    } catch (error) {
      console.error(error);
    }
    res = allAccounts;

    // this needs to be called OUTSIDE of the function call, otherwise 'this.setState' points to the function
    // instead of the class
    this.setState({
      results: res
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    // todo could use res, not sure if necessary
    let res;

    // if there is no search input return all accounts
    if (this.state.searchInput === "") {
      // res = await getAccounts();
      res = allAccounts
    }
    // otherwise if there is a specific search input return specific accounts
    else {
      try {
        // res = await searchAccounts(this.state.searchInput);
      } catch (error) {
        console.error(error)
      }

      res = [
        {
          accountId: "5f74548fdfca334fae0ecad2",
          firstName: this.state.searchInput,
          lastName: "Smith",
          profileImage: undefined
        }
      ]
    }

    // update the results
    this.setState(state => ({
      results: res,
    }));
  }

  render() {
    return (
      <div className="browse-container">
        <form onSubmit={ this.handleSubmit }>
          <input
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
              accountId = {result.accountId}
              firstName = {result.firstName}
              lastName = {result.lastName}
              profileImage = {result.profileImage}
            />
          ))}
        </div>
      </div>
    );
  }
}


export default Browse;