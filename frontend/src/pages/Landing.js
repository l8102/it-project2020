import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import "../css/Landing.css"
import LandingImage from "../assets/landingImage.jpg"

export default class Landing extends Component {
  render() {
    return (
      <div>
        <div className="landing-container">
          <div className="landing-text-container">
            <h1 className="landing-title">
              Welcome to Eagle ePortfolio
            </h1>
            <p className="landing-desc">
              We offer a secure platform for the sharing and viewing of students work. If you're a student
              simply create a new account and you can begin uploading your work and personal information all in
              the one place. If you're a recruiter, or someone wanting to browse other students' work, please make use
              of the browse feature.
            </p>
          </div>
          <div className="landing-nav">
            <NavLink to="browse">
              <button className="landing-button" id="left">
                Browse Portfolios
              </button>
            </NavLink>
            <NavLink to="createAccount">
              <button className="landing-button">
                Create a New Account
              </button>
            </NavLink>
            <NavLink to="login">
              <button className="landing-button" id="right">
                Login to an Existing Account
              </button>
            </NavLink>
          </div>
        </div>
        <div className="landing-image"/>
      </div>
    );
  }
}