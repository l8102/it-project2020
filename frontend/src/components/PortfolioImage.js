import React from "react"
import "../css/Portfolio.css";

export default function PortfolioImage() {

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  // todo figure out how to get around Promise sending

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const {current} = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="img-container">

      <input type="file" accept="image/*" onChange={handleImageUpload} ref={imageUploader} style={{display: "none"}}/>

      <button className="img" onClick={() => imageUploader.current.click()}>

        <img ref={uploadedImage} style={{width: "100%", height: "100%"}}/>
      </button>
    </div>
  );
}