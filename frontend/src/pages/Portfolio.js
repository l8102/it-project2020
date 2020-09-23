import React from "react";
import "../css/Portfolio.css";
import PrivateToggle from "../components/PrivateToggle";

// todo getIsPrivate
// todo if isPrivate, display the private access component
// todo otherwise, display as per usual

export default function Portfolio() {
    
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
  
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
      
      <div className="img-container">
        
        <input type="file" accept="image/*" onChange={handleImageUpload} ref={imageUploader} style={{display: "none"}}/>
        
        <button className="img" onClick={() => imageUploader.current.click()}>
          
          <img ref={uploadedImage} style={{width: "100%", height: "100%"}} alt="profile"/>
        </button>

      
      </div>
    </div>
  );   
}