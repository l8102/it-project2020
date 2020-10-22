import React, { Component } from 'react';
import Avatar from 'react-avatar-edit'
import "../css/Portfolio.css";
import { uploadProfilePicture } from '../Api.js'
import { getAccount } from '../Api.js'

export default class ProfilePicture extends Component {
  constructor(props) {
    super(props)
    const src = ''
    this.state = {
      preview: null,
      currentImage: null,
      src
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.handleSave = this.handleSave.bind(this);
  }
  
  onClose() {
    this.setState({preview: null})
  }
  
  async onCrop(preview) {
    await this.setState({preview})
    console.log(this.state.preview);
  }

  async handleSave() {
    try {
      await uploadProfilePicture(this.state.preview);
      await this.setState({ currentImage: this.state.preview});
    } catch (err) {
      console.error(err);
    }
  }

  async componentDidMount() {

    const res = await getAccount(sessionStorage.getItem("accountId"));
    console.log(res.data);

    if (res) {
      await this.setState({currentImage : res.data.profilePicture});
      console.log(this.state.currentImage);
    }   

  }
  
  render () {
    return (
      <div className="pp-container">
        <div className="img-container">
          <div className="upload-img">
            <h3 className="pp-title">
              Click to choose a new profile picture
            </h3>
            <div className="avatar">
              <Avatar
                width={390}
                height={295}
                onCrop={this.onCrop}
                onClose={this.onClose}
                src={this.state.src}
              />
            </div>
            
            <input
              className="save-btn pp-btn"
              type="submit"
              value="Save"
              onClick={this.handleSave}
            />
          </div>
          <div className="profile-img">
            <img src={this.state.currentImage} alt="" />
          </div>
        </div>
      </div>
    )
  }
}