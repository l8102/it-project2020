import React, {Component} from 'react';
import "../css/Portfolio.css";
import PrivateToggle from "../components/PrivateToggle";
import PortfolioImage from "../components/PortfolioImage";

// todo implement the APIs for setting and getting
import { getPortfolioContactInfo, setPortfolioContactInfo } from "../Api.js"
import {login} from "../Api";


class Portfolio extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      telephone: '',
      emailInput: '',
      telephoneInput: '',
      isLoaded: false
    };

    // This binding is necessary to make 'this' work in the callback
    // todo learn about bindings
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.contactInfoForm = this.contactInfoForm.bind(this);
  }

  // todo use this as a template
  async componentDidMount() {

    console.log("running");
    let res;

    try {
      // res = await getPortfolioContactInfo();
    } catch (error) {
      console.error(error);
    }

    // todo VERY IMPORTANT ! ! !
    // this needs to be called OUTSIDE of the function call, otherwise 'this.setState' points to the function
    // instead of the class
    this.setState({
      // email: res.data.email,
      // telephone: res.data.telephone,
      isLoaded: true
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // todo this can only be implemented when you have created the api
  async handleSubmit(e) {

    e.preventDefault();

    // todo implement input logic from form
    let newEmail = this.state.emailInput;
    let newTelephone = this.state.telephoneInput;

    // todo could use res, not sure if necessary
    let res;

    // update the portfolio contact info fields in the database
    try {
      await setPortfolioContactInfo(newEmail, newTelephone);
    } catch (error) {
      console.error(error)
    }

    // update the state
    this.setState(state => ({
      // todo update the state of the component
      email: newEmail,
      telephone: newTelephone,
    }));
  }

  contactInfoForm() {
    return(
      <form className="portfolio-form" onSubmit={ this.handleSubmit }>
        <label>
          Email:
        </label>
        <textarea
          className="small-text-box p-text-box"
          name="emailInput"
          value={this.state.emailInput}
          placeholder={ this.state.email }
          onChange={ this.handleChange }
        />
        <label>
          Telephone:
        </label>
        <textarea
          className="small-text-box p-text-box"
          name="telephoneInput"
          value={this.state.telephoneInput}
          placeholder={ this.state.telephone }
          onChange={ this.handleChange }
        />
        <input
          className="save-btn"
          type="submit"
          value="Save"
        />
      </form>
    )
  }

  render() {
    return (
      <div className="portfolio-container">
        <div className="user-info">
          <h1 className="name">
            User's Name
          </h1>
          <h3>
            Contact Information
          </h3>
          <this.contactInfoForm/>
          <PrivateToggle/>
        </div>
        <PortfolioImage/>
      </div>
    );
  }
}

export default Portfolio;