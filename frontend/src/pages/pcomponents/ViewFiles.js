import React, { Component } from "react";
import { getFiles } from '../../Api.js'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../css/Files.css";

export default class ViewFiles extends Component {
	constructor(props) {
		super(props);

		this.state = {
			files: [""], 
			pages: [""]
		}
	}

	async componentDidMount() {
		
		//gets all files that match the account id of the logged in user 
		const res = await getFiles();
		console.log(res);
		
		//base url of the cloudinary account 
		const BASE_URL = "https://res.cloudinary.com/dbk5wcucj/image/upload/"

		//fileUrls holds the unique file urls, fileArray contains the pages of the file
		const fileUrls = [];
		const fileArray = [];

		if (res.length === 0) {
			fileUrls[0] = "http://res.cloudinary.com/dbk5wcucj/image/upload/v1603500490/Files/kusdwm3jjqod4bpqull8.png";
			fileArray[0] = "http://res.cloudinary.com/dbk5wcucj/image/upload/v1603500490/Files/kusdwm3jjqod4bpqull8.png";
		}
		else {

			res.forEach((file, index) => {
				for (let i = 1; i <= file.filePages; i++) {	
					fileUrls[index] = BASE_URL + file.fileVersion + "/" + file.filePublicId + ".png";
					fileArray[i-1] = BASE_URL + "/pg_" + i + "/v" + file.fileVersion + "/" + file.filePublicId + ".png";
					console.log(fileArray);
				}    
			});   
		}

		await this.setState({
			files : fileUrls,
			pages : fileArray
		});
		console.log(this.state.files);

	}

	//creates a new carousel for a file containing all pages of the file 
	render() {
		const { files } = this.state;
		const { pages } = this.state;
		return (
			<div className="v-files">
				<h1 className="title">
						View Files
				</h1>
				<div className="file-container">
					{
						files.map((x, i) => {
							console.log(x);
							
							return (
								<Carousel> 
									{
										pages.map((y, i) => {
											return(
												<div className="file-img">
													<img src={ y }/>
												</div>
											)
										})
									}
								</Carousel>
							)
							
						})
					}   
				</div>
			</div>
		);
	}
}