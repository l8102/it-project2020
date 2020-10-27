import React, { Component } from "react";
import { getFiles } from '../../Api.js'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../css/Files.css";

export default class ViewFiles extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fileArray: [],
      isLoaded: false
		}
	}

	async componentDidMount() {
		
		//gets all files that match the account id of the logged in user 
		const res = await getFiles();
		console.log(res);
		
		//base url of the cloudinary account 
		const BASE_URL = "https://res.cloudinary.com/dbk5wcucj/image/upload/";

		// fileArray contains the pages of the file
		let fileArray = [];

		if (res.length === 0) {
		  let singleFile = []
      singleFile[0] = "http://res.cloudinary.com/dbk5wcucj/image/upload/v1603500490/Files/kusdwm3jjqod4bpqull8.png";
		  fileArray[0] = singleFile;
		}
		else {

			res.forEach((file, index) => {

			  // add each page to the file
        let singleFile = [];
				for (let i = 1; i <= file.filePages; i++) {
          singleFile[i-1] = BASE_URL + "/pg_" + i + "/v" + file.fileVersion + "/" + file.filePublicId + ".png";
				}

				// add the new file to the fileArray
        fileArray[index] = singleFile;
			});
      console.log(fileArray);
		}

		// Update the states
		this.setState({
			fileArray : fileArray,
      isLoaded: true
		});

	}

	//creates a new carousel for a file containing all pages of the file 
	render() {
		const { fileArray } = this.state;
		return (
			<div className="v-files">
				<h1 className="title">
						View Files
				</h1>
				<div className="file-container fedit-container">
					{
						fileArray.map((singleFile, i) => {
							console.log(singleFile);

							// For each file load a file carousel
							return (
								<FilesCarousel
                  singleFile={singleFile}
                  isLoaded={this.state.isLoaded}
                />
							)
						})
					}   
				</div>
			</div>
		);
	}
}

class FilesCarousel extends Component{
  constructor(props) {
    super(props);
  }

  render() {

    // If the carousel is loaded then render it, otherwise wait
    if (this.props.isLoaded) {
      return (
        <Carousel>
          {
            this.props.singleFile.map((y, j) => {
              return (
                <div className="file-img">
                  <img src={y} alt=""/>
                </div>
              )
            })
          }
        </Carousel>
      )
    } else {
      return (
        <div>
          Loading...
        </div>
      )
    }
  }
}