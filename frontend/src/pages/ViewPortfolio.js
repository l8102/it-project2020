import React, {Component} from 'react';
import "../css/Portfolio.css";

import { getPortfolio, getAccount } from "../Api.js"
import ViewAbout from "./pcomponents/ViewAbout";
import ViewGallery from "./pcomponents/ViewGallery";
import ViewFiles from "./pcomponents/ViewFiles";
import ViewLinks from "./pcomponents/ViewLinks";
import Tabs from "./pcomponents/Tabs";
import {colours} from "../constants/Colours";

class ViewPortfolio extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      profileImage: '',
      email: '',
      telephone: '',
      colour: '',
      isLoaded: false
    };

    // This binding is necessary to make 'this' work in the callback
    this.ableToView = this.ableToView.bind(this);
    this.renderPortfolioColours = this.renderPortfolioColours.bind(this);
    this.renderContactInfo = this.renderContactInfo.bind(this);
  }

  async componentDidMount() {
    console.log("running");
    let portfolio;
    let account;
    const accountId = sessionStorage.getItem("accountId");

    // Read in
    try {
      portfolio = await getPortfolio(accountId);
      account = await getAccount(accountId);
    } catch (error) {
      console.error(error);
    }

    // Set the states
    this.setState({
      firstName: account.data.firstName,
      lastName: account.data.lastName,
      profilePicture: account.data.profilePicture,
      email: portfolio.data.email,
      telephone: portfolio.data.telephone,
      colour: portfolio.data.colour,
      isLoaded: true
    })

    this.renderPortfolioColours(this.state.colour)
  }

  // Returns if there is an account id that the user can view
  // Sets the accountId if true
  ableToView() {
    const accountIdForView = sessionStorage.getItem("accountIdForView");
    if (accountIdForView !== null) {
      sessionStorage.setItem("accountId", accountIdForView);
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
  }

  renderContactInfo() {
    if (this.state.email !== undefined ||
        this.state.telephone !== undefined) {
      return (
        <div>
          <label className="contact-item">
            {this.state.email}
          </label>
          <label className="contact-item">
            {this.state.telephone}
          </label>
        </div>
      )
    } else {
      return (
        <div>
          <label className="contact-item">
            None
          </label>
        </div>
      )
    }
  }

  render() {
    // If the user is able to view, render the page normally
    if (this.ableToView()) {
      return (
        <div className="portfolio-page">
          <div className="portfolio-container">
            <div className="profile-picture-container">
              <img
                className="profile-img"
                src={this.state.profilePicture}
                alt=""
              />
            </div>
            <div className="user-info-container">
              <h1 className="name">
                {this.state.firstName + " " + this.state.lastName}
              </h1>
              <h3>
                Contact Information
              </h3>
              <this.renderContactInfo/>
            </div>
          </div>
          <Tabs>
            <div label="About Me">
              <ViewAbout firstName={ this.state.firstName }/>
            </div>
            <div label="Gallery">
              <ViewGallery/>
            </div>
            <div label="Files">
              <ViewFiles/>
            </div>
            <div label="Links">
              <ViewLinks/>
            </div>
          </Tabs>
        </div>
      );

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

export default ViewPortfolio;