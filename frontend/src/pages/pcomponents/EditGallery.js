import React, { Component } from 'react';
import { uploadAPI } from "../../Api.js";
import "../../css/Gallery.css";
import { getImages } from '../../Api.js'
import ViewGallery from './ViewGallery.js';
import ViewEditButton from "../../components/ViewEditButton"


export default class EditGallery extends Component {

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

    handleSubmitFile = (event) => {
        event.preventDefault();
        
        if (!this.state.selectedFile) 
            return;
        
        const reader = new FileReader();
        reader.readAsDataURL(this.state.selectedFile);
        reader.onloadend = () => {
            this.uploadImage(reader.result);
            //sessionStorage.setItem("activeTab", this.props.name);
            
        };
        reader.onerror = () => {
            console.error('error on submit');
        };
        window.location.reload();
    };

    //stores the image in the database 
    async uploadImage(base64EncodedImage) {
        try {
            const upload = await uploadAPI(base64EncodedImage);
            this.setState({
                selectedFile : ""
            });
        } catch (err) {
            console.error(err);
        }
    };

    handleButtonChange() {
        if (this.isToggleOn) {

        }
    }

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
                <RenderImages />
            </div>
        );
    }
};


class RenderImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [""]
    }

  }

  async componentDidMount() {

    const res = await getImages();

    const imageUrls = [];

    res.forEach((image, index) => {
      if (image.imageUrl) {
        imageUrls[index] = image.imageUrl;
      } 
    });     

    this.setState({images : imageUrls});
    console.log(this.state.images);

  }

  render() {
    const { images } = this.state;
    return (
      <div className="gedit-container">
        {
          images.map((x) => {
            console.log(x);
            return(
              <div className="gedit-tile">
                <img src={ x } className="gedit-img"/>
              </div>
            )
          })
        }   
      </div>
    );
  }
};


