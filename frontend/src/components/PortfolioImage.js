import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'
import "../css/Portfolio.css";

export default class PortfolioImage extends Component {
  constructor(props) {
    super(props)
    const src = ''
    this.state = {
      preview: null,
      src
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
    this.handleSave = this.handleSave.bind(this);
  }
  
  onClose() {
    this.setState({preview: null})
  }
  
  async onCrop(preview) {
    await this.setState({preview})
    console.log(this.state.preview);
  }

  onBeforeFileLoad(elem) {
    if(elem.target.files[0].size > 71680){
      alert("File is too big!");
      elem.target.value = "";
    };
  }

  handleSave() {
    const reader = new FileReader();
    console.log(this.state.preview);
      reader.readAsDataURL(this.state.preview);
      reader.onloadend = () => {
        this.uploadPP(reader.result);
        console.log(reader.result);
      };
      reader.onerror = () => {
          console.error('error on submit');
      };
  }

  uploadPP(base64EncodedImage) {
    try {
      //const upload = await uploadAPI(base64EncodedImage);
    } catch (err) {
        console.error(err);
    }
  }
  
  render () {
    return (
      <div>
        <h3>
          Click to choose a profile picture
        </h3>
        <Avatar
          width={390}
          height={295}
          onCrop={this.onCrop}
          onClose={this.onClose}
          onBeforeFileLoad={this.onBeforeFileLoad}
          src={this.state.src}
        />
        <img src={this.state.preview} alt="Preview" />
        <input
          className="save-btn"
          type="submit"
          value="Save"
          onClick={this.handleSave}
        />
      </div>
    )
  }
}