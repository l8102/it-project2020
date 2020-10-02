import React from "react";
import "../css/Portfolio.css";
import PrivateToggle from "../components/PrivateToggle";
import PortfolioImage from "../components/PortfolioImage";
import { getAccount } from "../Api.js"

// todo getIsPrivate
// todo if isPrivate, display the private access component
// todo otherwise, display as per usual

export default function Portfolio() {

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);


    // todo figure out how to get around Promise sending
    /*
    let accountData;

    try {
        accountData = getAccount();
    } catch (error) {
        console.error(error)
    }

    async function getAccountData() {

        const response = await getAccount()
        accountData = response.data;

        // This returns what we want
        console.log(accountData);
        return accountData;
    }

    console.log(accountData);
    */

    const handleImageUpload = e => {
      const [file] = e.target.files;
      if (file) {
        const reader = new FileReader();
        const { current } = uploadedImage;
        current.file = file;
        reader.onload = e => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };



  return (
    <div className="portfolio-container">
      <div className="user-info">
        <h1 className="name">
          User's Name
        </h1>
        <h3>
          Contact Information
        </h3>
        <form className="portfolio-form">
          <label>
            Email:
          </label>
          <textarea className="small-text-box p-text-box" />
          <label>
            Telephone:
          </label>
          <textarea className="small-text-box p-text-box" />
          <button className="save-btn">
            Save
          </button>
        </form>
        <PrivateToggle/>
      </div>
      <PortfolioImage/>
    </div>
  );   
}