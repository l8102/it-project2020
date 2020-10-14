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
        // Todo: For now, getImages calls on portfolioId "1" from previous schema for Gallery, needs to be
        // for account id
        const res = await getImages();
        //console.log(res);
    
        const imageUrls = [];

        res.forEach((image, index) => {
            imageUrls[index] = image.imageUrl;
        });     

        this.setState({images : imageUrls});
        console.log(this.state.images);

    }

    render() {
        const { images } = this.state;
        return (
            <div className="pcontainer">
                <h1>
                    View Gallery
                </h1>
                <Carousel>
                    {
                        images.map((x, i) => {
                            return(
                                <div key={ i }>
                                    <img src={ x }/>
                                    <p className="legend"> Legend {i + 1} </p>
                                </div>
                            )
                        })
                    }   
                </Carousel>
            </div>
        );
    }
};



