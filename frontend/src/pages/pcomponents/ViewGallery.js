import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getImages } from '../../Api.js'

export default class ViewGallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //An array of image urls
            images: [""]
        }

    }

  async componentDidMount() {

    const res = await getImages();
    console.log(res);

    const imageUrls = [];

    if (res.length === 0) {
        imageUrls[0] = "http://res.cloudinary.com/dbk5wcucj/image/upload/v1603497755/Gallery/f21bpwnpss3nf59mfr65.png";
    }
    else {
        res.forEach((image, index) => {
            imageUrls[index] = image.imageUrl;
          });    
    }

    this.setState({images : imageUrls});
    console.log(this.state.images);

  }

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



