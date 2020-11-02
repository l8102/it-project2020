import React, {Component} from "react";
import {fileUploadAPI, getFiles} from "../../Api.js";

/** renders the upload component and handles the file upload */
export default class EditFiles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedFile: "",
      files: [""]
    }

    // Bindings for the class methods
    this.fileChange = this.fileChange.bind(this);
    this.renderUpdate = this.renderUpdate.bind(this);
  }

  async componentDidMount() {
    await this.renderUpdate();
  }

  // Sets the state if a file is selected
  async fileChange(e) {
    let file = e.target.files[0];
    console.log(file);
    await this.setState({selectedFile: file});
  }

  //changes the file into an encoded url 
  async handleSubmitFile(event) {
    event.preventDefault();

    if (!this.state.selectedFile)
      return;

    const reader = new FileReader();
    console.log(this.state.selectedFile);
    await reader.readAsDataURL(this.state.selectedFile);

    reader.onloadend = () => {
      console.log(reader.result);
      this.uploadFile(reader.result);
    };
    reader.onerror = () => {
      console.error('error on submit');
    };
  };

  //sends the encoded file to the upload API, for upload into the database
  async uploadFile(base64EncodedImage) {
    try {
      const upload = await fileUploadAPI(base64EncodedImage);

      // after it is done uploading, render the update
      await this.renderUpdate();

      this.setState({
        selectedFile: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  //retrieves the uploaded files of the currently logged in user
  async renderUpdate() {
    const res = await getFiles();
    console.log(res);
    const BASE_URL = "https://res.cloudinary.com/dbk5wcucj/image/upload/w_500/v"

    const fileUrls = [];

    //stores files in the fileUrls
    res.forEach((file, index) => {
      fileUrls[index] = BASE_URL + file.fileVersion + "/" + file.filePublicId + ".png";
      console.log(fileUrls);
    });

    await this.setState({files: fileUrls});
    console.log(this.state.files);
  }

  //render upload component
  render() {
    return (
      <div className="pcontainer">
        <h1 className="title">Upload PDF Files</h1>
        <form onSubmit={e => this.handleSubmitFile(e)} className="gallery-form">
          <input
            type="file"
            name="pdf"
            onChange={e => this.fileChange(e)}
          />
          <button className="save-btn" type="submit">
            Upload
          </button>
        </form>
        <RenderFiles
          files={this.state.files}
        />
      </div>
    )
  }
}

/** renders each stored file as a tile (preview the first page of the file) */
class RenderFiles extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
  }

  render() {
    const {files} = this.props;
    return (
      <div className="e-files">
        <div className="file-container">
          {
            files.map((x, i) => {
              console.log(x);
              return (
                <div className="f-edit-tile">
                  <img src={x} className="fedit-img"/>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
