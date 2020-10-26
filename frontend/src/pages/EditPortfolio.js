import React, {Component} from 'react';
import "../css/Portfolio.css";

import PrivateToggle from "../components/PrivateToggle";
import ProfilePicture from "../components/ProfilePicture";
import ColourSelector from "../components/ColourSelector";
import { colours } from "../constants/Colours";

import { setPortfolioContactInfo, getPortfolio, getAccount } from "../Api.js"

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
import PageToggle from "../components/PageToggle";

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
        accessCode: '',
        colour: '',
        isLoaded: false
    };

    // This binding is necessary to make 'this' work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.contactInfoForm = this.contactInfoForm.bind(this);
    this.ableToEdit = this.ableToEdit.bind(this);
    this.renderPortfolioColours = this.renderPortfolioColours.bind(this);
  }

  async componentDidMount() {

    let portfolio, account;
    const accountId = sessionStorage.getItem("accountId");

    try {
        portfolio = await getPortfolio(accountId);
        account = await getAccount(accountId);
    } catch (error) {
      console.error(error);
    }

    // this needs to be called OUTSIDE of the function call, otherwise 'this.setState' points to the function
    // instead of the class
      this.setState({
        firstName: account.data.firstName,
        lastName: account.data.lastName,
        profilePicture: account.data.profilePicture,
        email: portfolio.data.email,
        telephone: portfolio.data.telephone,
        isPrivate: portfolio.data.isPrivate,
        accessCode: portfolio.data.accessCode,
        colour: portfolio.data.colour,
        isLoaded: true
    })

    this.renderPortfolioColours(this.state.colour)
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
          className="save-btn right-btn"
          type="submit"
          value="Save"
        />
      </form>
    )
  }

  // Returns if there is an account id that the user can edit
  // Sets the accountId if true
  ableToEdit() {
    const accountIdForEdit = sessionStorage.getItem("accountIdForEdit");
    if (accountIdForEdit !== null) {
      sessionStorage.setItem("accountId", accountIdForEdit);
      return true;
    } else {
      return false;
    }
  }

  renderPortfolioColours(colour) {
    // Get the current styles
    let styles = document.documentElement.style;

    // Get the colour set from the colours dictionary
    let colourSet = colours[colour];

    // Use this colour set to render the portfolio colours
    styles.setProperty('--light-portfolio', colourSet.light);
    styles.setProperty('--mid-portfolio', colourSet.mid);
    styles.setProperty('--dark-portfolio', colourSet.dark);

    // Update the colour
    this.setState({
      colour: colour
    })
  }

  render() {
    // If the user is able to edit, and the page is loaded render the page normally
    if (this.ableToEdit()) {
      if (this.state.isLoaded) {
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
                <PrivateToggle
                  isPrivate={this.state.isPrivate}
                  accessCode={this.state.accessCode}
                />
                <ColourSelector
                  colour={this.state.colour}
                  renderPortfolioColours={this.renderPortfolioColours}
                />
              </div>
              <ProfilePicture/>
            </div>
            <Tabs>
              <div label="About Me">
                <PageToggle
                  defaultPage={<ViewAbout firstName={this.state.firstName}/>}
                  alternatePage={<EditAbout firstName={this.state.firstName}/>}
                />
              </div>
              <div label="Gallery">
                <PageToggle
                  defaultPage={<ViewGallery />}
                  alternatePage={<EditGallery />}
                />
              </div>
              <div label="Files">
                <PageToggle
                  defaultPage={<ViewFiles />}
                  alternatePage={<EditFiles />}
                />
              </div>
              <div label="Links">
                <PageToggle
                  defaultPage={<ViewLinks />}
                  alternatePage={<EditLinks />}
                />
              </div>
            </Tabs>
          </div>
        );

      // Otherwise if not loaded, show the page is loading
      } else {
        return (
          <div>
            Loading...
          </div>
        )
      }
    // Otherwise, deny access
    } else {
      return (
        <div className="access-denied">
          Access Denied
        </div>
      )
    }
  }
}

export default EditPortfolio;