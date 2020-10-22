import React, {Component} from 'react';
import "../css/Portfolio.css";

import { getPortfolioContactInfo, getAccount, getPortfolioIsPrivate } from "../Api.js"
import ProfilePicture from "../components/ProfilePicture";

// todo use this as a template for other classes, done well
class ViewPortfolio extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      profileImage: '',
      email: '',
      telephone: '',
      isPrivate: '',
      isLoaded: false
    };
  }

  // todo use this as a template
  async componentDidMount() {
    console.log("running");
    let contactInfo;
    let account;
    let privacy;

    // Read in
    try {
      contactInfo = await getPortfolioContactInfo();
      account = await getAccount(sessionStorage.getItem("accountId"));
      privacy = await getPortfolioIsPrivate(sessionStorage.getItem("accountId"));
    } catch (error) {
      console.error(error);
    }

    // Set the states
    this.setState({
      firstName: account.data.firstName,
      lastName: account.data.lastName,
      profilePicture: account.data.profilePicture,
      email: contactInfo.data.email,
      telephone: contactInfo.data.telephone,
      isPrivate: privacy.data.isPrivate,
      isLoaded: true
    })
  }

  render() {
    return (

      <div className="portfolio-container">
        <div className="user-info">
          <h1 className="name">
            {this.state.firstName + " " + this.state.lastName}
          </h1>
          <h3>
            Contact Information
          </h3>
            <label>
              Email:
            </label>
            <textarea
              className="small-text-box p-text-box"
              name="emailInput"
              placeholder={ this.state.email }
            />
            <label>
              Telephone:
            </label>
            <textarea
              className="small-text-box p-text-box"
              placeholder={ this.state.telephone }
            />
            <input
              className="save-btn"
              type="submit"
              value="Save"
            />
        </div>
        <ProfilePicture/>
      </div>
    );
  }
}

export default ViewPortfolio;