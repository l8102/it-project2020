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

// todo handle permission to edit (security)
class EditPortfolio extends Component {

  constructor(props) {
    super(props);

      this.state = {
        firstName: '',
        lastName: '',
        profilePicture: '',
        email: '',
        telephone: '',
        emailInput: '',
        telephoneInput: '',
        isPrivate: '',
        isLoaded: false
    };

    // This binding is necessary to make 'this' work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.contactInfoForm = this.contactInfoForm.bind(this);
    this.hasPermissionToEdit = this.hasPermissionToEdit.bind(this);
  }

  async componentDidMount() {

    console.log("running");
    let contactInfo, account;
    const accountId = sessionStorage.getItem("accountId")

    try {
        contactInfo = await getPortfolioContactInfo(accountId);
        account = await getAccount();
    } catch (error) {
      console.error(error);
    }

    // this needs to be called OUTSIDE of the function call, otherwise 'this.setState' points to the function
    // instead of the class
      this.setState({
        firstName: account.data.firstName,
        lastName: account.data.lastName,
        profilePicture: account.data.profilePicture,
        email: contactInfo.data.email,
        telephone: contactInfo.data.telephone,
        isLoaded: true
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

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

  // Returns if the account Id that the user has permission to edit matches
  // The account Id stored in session storage
  // Also checks that the account Id is not null
  hasPermissionToEdit() {
    const accountId = sessionStorage.getItem("accountId");
    const permissionToEdit = sessionStorage.getItem("permissionToEdit");
    return (accountId === permissionToEdit && accountId !== null);
  }

  render() {
    if (!this.hasPermissionToEdit()) {
      return (
        <div className="access-denied">
          Access Denied
        </div>
      )
    } else {
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
}

export default EditPortfolio;