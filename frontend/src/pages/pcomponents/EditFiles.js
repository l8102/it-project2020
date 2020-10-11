import React, { Component } from "react";
import { fileUploadAPI } from "../../Api.js";

export default class EditFiles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedFile: ""
    }

    this.fileChange = this.fileChange.bind(this);
  }

  async fileChange(e) {
    let file = e.target.files[0];
    console.log(file);
    await this.setState({selectedFile: file});
    console.log(this.state.selectedFile);
  }

  async handleSubmitFile(event) {
    event.preventDefault();
    
    if (!this.state.selectedFile) 
        return;
    
    const reader = new FileReader();
    console.log(this.state.selectedFile);
    const it = await reader.readAsDataURL(this.state.selectedFile);
    console.log(it);
    reader.onloadend = () => {
      console.log(reader.result);
        this.uploadFile(reader.result);
    };
    reader.onerror = () => {
        console.error('error on submit');
    };
};

  //stores the image in the database 
async uploadFile(base64EncodedImage) {
  try {
      const upload = await fileUploadAPI(base64EncodedImage);
      this.setState({
          selectedFile : ""
      });
  } catch (err) {
      console.error(err);
  }
};

  render() {
      return (
          <div className="pcontainer">
              <h1 className="title">Upload PDF Files</h1>
              <form onSubmit={e => this.handleSubmitFile(e)} className="account-form gallery-form">
                  <input
                      type="file"
                      name="pdf"
                      onChange={e => this.fileChange(e)}
                  />
                  <button className="btn" type="submit">
                      Upload
                  </button>
              </form>
          </div>
      )
  }
}
