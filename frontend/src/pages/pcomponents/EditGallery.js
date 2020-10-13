//import React, { useState } from 'react';
import React, { Component } from 'react';
import { uploadAPI } from "../../Api.js";
import "../../css/Gallery.css";
import { getImages } from '../../Api.js'
import ViewGallery from './ViewGallery.js';
import PageToggle from "../../components/PageToggle"

export default class Gallery extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isToggleOn: false
        }

        this.handleButtonChange = this.handleButtonChange.bind(this);
    }

    handleButtonChange() {
        console.log(this.state);
        if(this.isToggleOn) {
            console.log("hello");
            this.setState({
                isToggleOn: !this.state.isToggleOn
    
            });
            return (<ViewGallery /> );
        }
        else {
            this.setState({
                isToggleOn: !this.state.isToggleOn
    
            });
            return (<EditGallery />)

        }
    }
    
    render() {
        return (
            <PageToggle onChange={this.handleButtonChange} isToggleOn={this.state.isToggleOn}/>
        )
    }
};

class EditGallery extends Component {

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
        };
        reader.onerror = () => {
            console.error('error on submit');
        };
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
                <form onSubmit={e => this.handleSubmitFile(e)} className="account-form gallery-form">
                    <input
                        type="file"
                        name="image"
                        onChange={e => this.fileChange(e)}
                        className="form-input"
                    />
                    <button className="btn" type="submit">
                        Upload
                    </button>
                </form>
            </div>
        );
    }
};


