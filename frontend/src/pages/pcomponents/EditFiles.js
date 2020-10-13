import React, { Component } from "react";
import { fileUploadAPI } from "../../Api.js";
import { getFiles } from '../../Api.js';

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
              <RenderFiles />
          </div>
      )
  }
}

class RenderFiles extends Component {
  constructor(props) {
      super(props);

      this.state = {
          //An array of image urls
          files: [""]
      }

  }

  async componentDidMount() {
      // Todo: For now, getImages calls on portfolioId "1" from previous schema for Gallery, needs to be
      // for account id
      const res = await getFiles();
      console.log(res);
      const BASE_URL = "https://res.cloudinary.com/dbk5wcucj/image/upload/w_500/v"
  
      const fileUrls = [];

      res.forEach((file, index) => {
        fileUrls[index] = BASE_URL + file.fileVersion + "/" + file.filePublicId + ".png";
        console.log(fileUrls);
      });
    

      await this.setState({files : fileUrls});
      console.log(this.state.files);

  }

  render() {
      const { files } = this.state;
      return (
          <div className="files">
              <h1>
                  Uploaded Files
              </h1>
              <div>
                  {
                      files.map((x, i) => {
                          console.log(x);
                          return(
                              <div>
                                  <img src={ x }/>
                              </div>
                          )
                      })
                  }   
              </div>
          </div>
      );
  }
}
