import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getImages } from '../../Api.js'


export default function ViewGallery() {
    
    return (
        <div className="pcontainer">
            <h1>
                View Gallery
            </h1>
            <Carousel>
                <div>
                    <img src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
            <button
                onClick = {
                    async function carouselImages() {
                        const res = await getImages("1");
                        console.log(res);

                        const images = []

                        res.forEach((image, index) => {
                            images[index] = image.imageUrl;
                        });

                        console.log(images);

                        return images;
                    }
                }
            >
                test
            </button>
        </div>
    );
}