import React, { Component } from "react";
import { getFiles } from '../../Api.js'

export default class ViewFiles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //An array of image urls
            files: [""]
        }

    }

    async componentDidMount() {
        // Todo: For now, getImages calls on portfolioId "1" from previous schema for Gallery, needs to be
        // for account id
        const res = await getFiles();
        console.log(res);
    
        const fileUrls = [];

        res.forEach((file, index) => {
            fileUrls[index] = file.fileUrl;
            console.log(fileUrls);
        });     

        await this.setState({files : fileUrls});
        console.log(this.state.files);

    }

    render() {
        const { files } = this.state;
        return (
            <div className="pcontainer">
                <h1>
                    View Files
                </h1>
                <div>
                    {
                        files.map((x, i) => {
                            console.log(x);
                            return(
                                <div>
                                    <img src={ x }/>
                                </div>
                            )
                        })
                    }   
                </div>
            </div>
        );
    }
}