import React from "react";
import ReactDOM from "react-dom";
import "../css/Portfolio.css";


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
          Name
        </h1>
        <form>
          <label className="contact-info">
            Contact Information
          </label>
          <textarea classname="text-box">
            
          </textarea>
          <button className="save-btn">
            Save
          </button>
        </form>
      </div>
      <div className="img-container">
        
        <input type="file" accept="image/*" onChange={handleImageUpload} ref={imageUploader} style={{display: "none"}}/>
        
        <div className="img" onClick={() => imageUploader.current.click()}>
          
          <img ref={uploadedImage} style={{width: "100%", height: "100%"}}/>
        
        </div>
        
        Click to Upload Image
      
      </div>
    </div>
  );   
}