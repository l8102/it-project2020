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

   /* fileChange = event => {
      event.preventDefault();
        console.log(event.target.files[0]);
        
        this.setState({ selectedFile: event.target.files[0] });
        console.log(this.state);
    }
    */

  /*fileChange(e) {
    e.preventDefault();
    this.setState({ selectedFile: e.target.files[0] });
    console.log(e.target.files[0]);
    console.log(this.state);
  }
  */

  fileChange(e) {
    let file = e.target.files;
    console.log(file);
    this.setState({selectedFile: file[0]});
    console.log(this.state);

    if(file) {
      let data = new FormData();
      data.append('file', file);
      console.log(data.entries);
    }
  }

    handleSubmitFile(event) {
        event.preventDefault();
        console.log(this.state.selectedFile);

        const reader = new FileReader();
        reader.readAsDataURL(this.state.selectedFile);
        reader.onloadend = () => {
            this.upload(reader.result);
        };
        reader.onerror = () => {
            console.error('error on submit');
        };
    };

    //stores the image in the database 
    upload = async (base64EncodedImage) => {
        try {
            const upload = await fileUploadAPI(base64EncodedImage);
            console.log(upload);
            /*this.setState({
                selectedFile: null
            })
            */
           
        } catch (err) {
            console.error(err);
        }
    };
    

    

    render() {
        return (
            <div className="pcontainer">
                <h1 className="title">Upload PDF Files</h1>
                <form onSubmit={this.handleSubmitFile} className="account-form gallery-form">
                    <input
                        type="file"
                        name="pdf"
                        value={this.state.selectedFile}
                        onChange={this.fileChange}
                    />
                    <button className="btn" type="submit">
                        Upload
                    </button>
                </form>
            </div>
        )
    }
}
