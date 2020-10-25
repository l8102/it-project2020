import React, {Component} from 'react';
import "../css/AccessCode.css";
import { withRouter } from 'react-router-dom';
import {getAccount, getPortfolio} from "../Api";

class EnterAccessCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      accessCode: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {

    let account;

    // Read in
    try {
      account = await getAccount(sessionStorage.getItem("accountIdTemp"));
    } catch (error) {
      console.error(error);
    }

    this.setState({
      fullName: account.data.firstName + " " + account.data.lastName
    })

  }

  // Method to handle change in input
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  // Method to handle form submission
  async handleSubmit(e) {
    e.preventDefault();

    let portfolio;
    const accountIdTemp = sessionStorage.getItem("accountIdTemp");

    // Read in the portfolio
    try {
      portfolio = await getPortfolio(accountIdTemp);
    } catch (error) {
      console.error(error);
    }

    // Check if the access code matches
    if (this.state.accessCode === portfolio.data.accessCode) {
      // Store the account id that the user can view
      sessionStorage.setItem("accountIdForView", accountIdTemp);
      // Navigate to the view portfolio page
      this.props.history.push("/viewPortfolio");

    // Otherwise have the user try again
    } else {
      alert("Incorrect access code");
    }
  }

    render() {
    return (
      <div className="access-code-container" >
        <h1 className="access-code-title" >
          {this.state.fullName} has their portfolio set to private
        </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="password"
            name="accessCode"
            value={this.state.accessCode}
            placeholder="Please enter the access code here"
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default withRouter(EnterAccessCode);
