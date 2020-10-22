import React, {Component} from 'react';
import "../css/Portfolio.css";

import { getPortfolioContactInfo, getAccount } from "../Api.js"
import ViewAbout from "./pcomponents/ViewAbout";
import ViewGallery from "./pcomponents/ViewGallery";
import ViewFiles from "./pcomponents/ViewFiles";
import ViewLinks from "./pcomponents/ViewLinks";
import Tabs from "./pcomponents/Tabs";

// todo handle permission to view (security)
class ViewPortfolio extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      profileImage: '',
      email: '',
      telephone: '',
      isLoaded: false
    };
  }

  // todo use this as a template
  async componentDidMount() {
    console.log("running");
    let contactInfo;
    let account;

    // Read in
    try {
      contactInfo = await getPortfolioContactInfo();
      account = await getAccount(sessionStorage.getItem("accountId"));
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
      isLoaded: true
    })
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
            <label className="contact-item">
              { this.state.email }
            </label>
            <label className="contact-item">
              { this.state.telephone }
            </label>
          </div>
          <div className="pp-container">
            <div className="profile-img">
              <img  src={this.state.profilePicture} alt="" />
            </div>
          </div>
        </div>
        <Tabs>
          <div label="About Me">
            <ViewAbout />
          </div>
          <div label="Gallery">
            <ViewGallery />
          </div>
          <div label="Files">
            <ViewFiles />
          </div>
          <div label="Links">
            <ViewLinks />
          </div>
        </Tabs>
      </div>
    );
  }
}

export default ViewPortfolio;