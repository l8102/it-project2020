import React, {Component} from 'react';
import Avatar from 'react-avatar-edit';
import {uploadProfilePicture, getAccount} from '../Api.js';
import "../css/Portfolio.css";

// handles the upload and viewing of the profile picture
export default class ProfilePicture extends Component {
  constructor(props) {
    super(props)
    const src = ''
    this.state = {
      preview: null,
      currentImage: null,
      src,
      edit: false
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.handleSave = this.handleSave.bind(this);
    this.switchToEdit = this.switchToEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  // if cancel in avatar pressed 
  onClose() {
    this.setState({preview: null})
  }

  //saves the portion of the cropped image
  async onCrop(preview) {
    await this.setState({preview})
    console.log(this.state.preview);
  }

  //uploads the portion of the image to the database through the API 
  async handleSave() {
    try {
      await uploadProfilePicture(this.state.preview);
      await this.setState({currentImage: this.state.preview, edit: false});
    } catch (err) {
      console.error(err);
    }
  }

  //retrieves the profile picture from the database base on the currently 
  // logged in user 
  async componentDidMount() {

    const res = await getAccount(sessionStorage.getItem("accountId"));
    console.log(res.data);

    if (res) {
      await this.setState({currentImage: res.data.profilePicture});
      console.log(this.state.currentImage);
    }

  }

  async switchToEdit() {
    await this.setState({edit: true});
  }

  async cancelEdit() {
    await this.setState({edit: false});
  }


  //renders the avatar for the profile picture, or the uploaded profile picture
  render() {

    let style = getComputedStyle(document.getElementById('root'));
    let midPortfolio = style.getPropertyValue('--mid-portfolio');

    return (
      <div className="profile-picture-container">
        <div className="img-container">
          {this.state.edit &&
          <div>
            <Avatar
              label="Click to upload a new profile picture"
              labelStyle={{
                padding: "140px 20px",
              }}
              width={300}
              height={300}
              onCrop={this.onCrop}
              onClose={this.onClose}
              src={this.state.src}
            />
            <input
              className="save-btn right-btn"
              type="submit"
              value="Save"
              onClick={this.handleSave}
            />
            <input
              className="save-btn left-btn"
              type="submit"
              value="Cancel"
              onClick={this.cancelEdit}
            />
          </div>
          }
          {!this.state.edit &&
          <div>
            <img
              className="profile-img"
              src={this.state.currentImage}
              alt=""
            />
            <input
              className="save-btn right-btn"
              type="submit"
              value="Edit"
              onClick={this.switchToEdit}
            />
          </div>
          }
        </div>
      </div>
    )
  }
}