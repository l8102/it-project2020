import React, {Component} from 'react';
import "../css/Portfolio.css";
import PrivateToggle from "../components/PrivateToggle";
import ProfilePicture from "../components/ProfilePicture";

import { getPortfolioContactInfo, setPortfolioContactInfo, getAccount } from "../Api.js"

// Import page components
import Tabs from "./pcomponents/Tabs";
import EditAbout from "./pcomponents/EditAbout";
import ViewAbout from "./pcomponents/ViewAbout";
import EditGallery from "./pcomponents/EditGallery";
import ViewGallery from "./pcomponents/ViewGallery";
import EditFiles from "./pcomponents/EditFiles";
import ViewFiles from "./pcomponents/ViewFiles";
import EditLinks from "./pcomponents/EditLinks";
import ViewLinks from "./pcomponents/ViewLinks";

// todo use this as a template for other classes, done well
class EditPortfolio extends Component {

  constructor(props) {
    super(props);

      this.state = {
          firstName: '',
          lastName: '',
          profileImage: '',
          email: '',
          telephone: '',
        emailInput: '',
        telephoneInput: '',
        isLoaded: false
    };

    // This binding is necessary to make 'this' work in the callback
    // todo learn about bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.contactInfoForm = this.contactInfoForm.bind(this);
  }

  // todo use this as a template
  async componentDidMount() {

    console.log("running");
      let contactInfo;
      let account;

    try {
        contactInfo = await getPortfolioContactInfo();
        account = await getAccount(sessionStorage.getItem("accountId"));
    } catch (error) {
      console.error(error);
    }

    // todo VERY IMPORTANT ! ! !
    // this needs to be called OUTSIDE of the function call, otherwise 'this.setState' points to the function
    // instead of the class
      this.setState({
          firstName: account.data.firstName,
          lastName: account.data.lastName,
          profileImage: account.data.profileImage,
        email: contactInfo.data.email,
        telephone: contactInfo.data.telephone,
        isLoaded: true
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // todo this can only be implemented when you have created the api
  async handleSubmit(e) {

    e.preventDefault();

    let newEmail, newTelephone;

    // If there is no input, the new email is the same as the old one
    if (this.state.emailInput === "") {
      newEmail = this.state.email;
    } else {
      newEmail = this.state.emailInput;
    }

    // If there is no input, the new telephone is the same as the old one
    if (this.state.telephoneInput === "") {
      newTelephone = this.state.telephone;
    } else {
      newTelephone = this.state.telephoneInput;
    }

    // todo could use res, not sure if necessary
    let res;

    // update the portfolio contact info fields in the database
    try {
      await setPortfolioContactInfo(newEmail, newTelephone);
    } catch (error) {
      console.error(error)
    }

    // todo could implement validation

    // update the state
    this.setState(state => ({
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
      <div>
        <div className="portfolio-container">
          <div className="user-info">
            <h1 className="name">
              {this.state.firstName + " " + this.state.lastName}
            </h1>
            <h3>
              Contact Information
            </h3>
            <this.contactInfoForm/>
            <PrivateToggle/>
          </div>
          <ProfilePicture/>
        </div>
        <Tabs>
          <div label="About Me">
            <EditAbout />
            <ViewAbout />
          </div>
          <div label="Gallery">
            <EditGallery />
            <ViewGallery />
          </div>
          <div label="Files">
            <EditFiles />
            <ViewFiles />
          </div>
          <div label="Links">
            <EditLinks />
            <ViewLinks />
          </div>
        </Tabs>
      </div>
    );
  }
}

export default EditPortfolio;