import React, {Component} from 'react';
import {uploadAPI, getImages} from "../../Api.js";
import "../../css/Gallery.css";

/** renders the upload component and handles the image upload */
export default class EditGallery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedFile: "",
      images: [""]
    }

    this.fileChange = this.fileChange.bind(this);
    this.renderUpdate = this.renderUpdate.bind(this);
  }

  async componentDidMount() {
    await this.renderUpdate();
  }

  //sets the state if an image is selected 
  async fileChange(e) {
    let file = e.target.files[0];
    console.log(file);
    await this.setState({selectedFile: file});
  }

  //changes the image into an encoded url 
  async handleSubmitFile(event) {
    event.preventDefault();

    if (!this.state.selectedFile)
      return;

    const reader = new FileReader();
    reader.readAsDataURL(this.state.selectedFile);
    reader.onloadend = () => {
      this.uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error('error on submit');
    };
  };

  //sends the encoded image to the upload API, for upload into the database
  async uploadImage(base64EncodedImage) {
    try {
      const upload = await uploadAPI(base64EncodedImage);

      // after it is done uploading, render the update
      await this.renderUpdate();
      this.setState({
        selectedFile: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  //retrieves the uploaded images of the currently logged in user
  async renderUpdate() {
    const res = await getImages();
    const imageUrls = [];

    //stores images in the imageUrl
    res.forEach((image, index) => {
      if (image.imageUrl) {
        imageUrls[index] = image.imageUrl;
      }
    });

    this.setState({
      images: imageUrls
    });
    console.log(this.state.images);
  }

  //render upload component
  render() {
    return (
      <div className="pcontainer">
        <h1 className="title">Upload Gallery Images</h1>
        <form onSubmit={e => this.handleSubmitFile(e)} className="gallery-form">
          <input
            type="file"
            name="image"
            onChange={e => this.fileChange(e)}
          />
          <button className="save-btn" type="submit">
            Upload
          </button>
        </form>
        <RenderImages images={this.state.images}/>
      </div>
    );
  }
};

/** renders each stored image as a tile */
class RenderImages extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {images} = this.props;
    console.log(images)
    return (
      <div className="gedit-container">
        {
          images.map((x) => {
            console.log(x);
            return (
              <div className="gedit-tile">
                <img src={x} className="gedit-img" alt=""/>
              </div>
            )
          })
        }
      </div>
    );
  }
}


