import React, { useState, useEffect } from 'react';
import { uploadAPI } from "../../Api.js";
import "../../css/Gallery.css";

export default function Upload() {
    const [fileState, setFileState] = useState('');
    const [preview, setPreview] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    //when the user changes the file change state 
    const fileChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileState(e.target.value);
    };

    //extracts the image as a url 
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result);
        };
    };

    //
    const handleSubmitFile = (event) => {
        event.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    //stores the image in the database 
    const uploadImage = async (base64EncodedImage) => {
        try {
            const upload = await uploadAPI(base64EncodedImage);
            setFileState('');
            setPreview('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };
    return (
        <div className="pcontainer">
            <h1 className="title">Upload Gallery Images</h1>
            <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" />
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
            {preview && (
                <img
                    src={preview}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>
    );
}

function Alert({ msg, type }) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (msg) {
            setShow(true);
            setInterval(() => {
                setShow(false);
            }, 2000);
        }
    }, [msg]);
    return <>{show && <div className={`alert alert-${type}`}>{msg}</div>}</>;
}