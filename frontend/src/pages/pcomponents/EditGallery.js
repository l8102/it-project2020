import React, { useState } from 'react';
//import React, { Component } from 'react';
import { uploadAPI } from "../../Api.js";
import "../../css/Gallery.css";
import { getImages } from '../../Api.js'
import ViewGallery from './ViewGallery.js';


export default function Upload() {
    const [fileState, setFileState] = useState('');
    //const [preview, setPreview] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [imageState, setImageState] = useState('');

    

    //when the user changes the file change state 
    const fileChange = (e) => {
        const file = e.target.files[0];
        //previewFile(file);
        setSelectedFile(file);
        setFileState(e.target.value);
    };

    //extracts the image as a url 
    /*const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result);
        };
    };
    */

    //
    const handleSubmitFile = (event) => {
        event.preventDefault();
        
        if (!selectedFile) 
            return;
        
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('error on submit');
        };
    };

    //stores the image in the database 
    const uploadImage = async (base64EncodedImage) => {
        try {
            const upload = await uploadAPI(base64EncodedImage);
            console.log(upload);
            setFileState('');
            //setPreview('');
        } catch (err) {
            console.error(err);
        }
    };

    async function renderImageTiles(e) {
        const res = await getImages("1");
        console.log(res);

        const imageUrls = [];

        res.forEach((image, index) => {
            imageUrls[index] = image.imageUrl;
        });     

        setImageState(imageUrls);
        console.log(imageState);
    };

    return (
        <div className="pcontainer">
            <h1 className="title">Upload Gallery Images</h1>
            <form onSubmit={handleSubmitFile} className="account-form gallery-form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={fileChange}
                    value={fileState}
                    className="form-input"
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {/*preview && (
                <img
                    src={preview}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )*/}
            {/*<div>
                {
                    image.map((x, i) => {
                        console.log(x);
                        return(
                            <div>
                                <img src={ x } style={{ height: '300px' }}/>
                            </div>
                        )
                    })
                }   
            </div>
            */}
        </div>
    );
}



/*
class RenderImageTiles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //An array of image urls
            images: [""]
        }

    }

    async componentDidMount() {
        // Todo: "1" needs to be changed to the accountId, so need to retrieve accountId before
        // calling getImages(). For now, getImages calls on portfolioId "1" from previous schema for Gallery
        const res = await getImages("1");
        console.log(res);
    
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
            <div className="tile-image">
                    {
                        images.map((x, i) => {
                            console.log(x);
                            return(
                                <div>
                                    <img src={ x }/>
                                </div>
                            )
                        })
                    }   
            </div>
        );
    }


};


export default class EditGallery extends Component {

    constructor(props) {
        super(props);

        this.state = {
            file: [],
            selectedFile: []
        }

    }

    fileChange(e) {
        let files = e.target.files;
        this.setState({file : files[0]});
        this.setState({selectedFile : files[0]});
    };

    handleSubmitFile(e) {
        e.preventDefault();
        
        if (!this.selectedFile) 
            return;
        
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onloadend = () => {
            console.log(reader.result);
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
            this.setState({file : ""});
            this.setState({selectedFile : ""});
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        let selectedFile = this.state;
        return (
            <div className="pcontainer">
                <h1 className="title">Upload Gallery Images</h1>
                <form onSubmit={e => this.handleSubmitFile(e)} className="account-form gallery-form">
                    <input
                        id="fileInput"
                        type="file"
                        name="image"
                        onChange={e => this.fileChange(e)}
                        className="form-input"
                    />
                    <button className="btn" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
};
*/



