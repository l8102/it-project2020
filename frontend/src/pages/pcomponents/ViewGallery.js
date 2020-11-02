import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getImages } from '../../Api.js'

/** class renders all uploaded images of the currently logged in user to a carousel */
export default class ViewGallery extends Component {
    
  constructor(props) {
    super(props);

    this.state = {
      //An array of image urls
      images: [""]
    }
  }

  //retieves images from database and adds them to the imageUrls array
  async componentDidMount() {

    //retrieves images
    const res = await getImages();
    console.log(res);

    const imageUrls = [];

    //if no images uploaded, render please upload image
    if (res.length === 0) {
      imageUrls[0] = "http://res.cloudinary.com/dbk5wcucj/image/upload/v1603497755/Gallery/f21bpwnpss3nf59mfr65.png";
    }
    else {
      //for each url add it to the imageUrls array 
      res.forEach((image, index) => {
        imageUrls[index] = image.imageUrl;
      });    
    }

    //set the state to the array 
    this.setState({images : imageUrls});
    console.log(this.state.images);
  }

  //renders the images into the carousel 
  render() {
    const { images } = this.state;
    return (
      <div className="pcontainer">
        <h1 className="title">
          View Gallery
        </h1>
        <Carousel className="carousel">
          {
            images.map((x, i) => {
              return(
                <div key={ i }>
                  <img src={ x }/>
                </div>
              )
            })
          }   
        </Carousel>
      </div>
    );
  }
};



