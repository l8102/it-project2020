import React, {Component} from 'react';
// import "../css/EnterAccessCode.css";
import { withRouter } from 'react-router-dom';
// import SearchResult from "../components/SearchResult";
// import {getAllAccountsByFullName, getAllAccounts} from "../Api";

class EnterAccessCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessCode: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Method to handle change in input
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  // Method to handle form submission
  async handleSubmit(e) {
    e.preventDefault();

    let res;

    // todo get access code from database
    //   will be generated at portfolio creation

    const accessCode = "123"

    const accountIdTemp = sessionStorage.getItem("accountIdTemp");

    if (this.state.accessCode === accessCode) {
      // Store the account id that the user can view
      sessionStorage.setItem("accountIdForView", accountIdTemp);
      // Navigate to the view portfolio page
      this.props.history.push("/viewPortfolio");
    } else {
      alert("Incorrect access code");
    }
  }

    render() {
    return (
      <div>
        <h1 className="private-access-title" >
          This portfolio is private. Please enter the access code below.
        </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="password"
            name="accessCode"
            value={this.state.accessCode}
            onChange={this.handleChange}
          />
          <button type="submit" className="access-code-btn">
            Enter
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(EnterAccessCode);
