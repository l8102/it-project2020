import React, { Component } from "react";
import { getLinks } from "../../Api.js";
import "../../css/AboutLinks.css"

export default class ViewLinks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            linksList: [{
                title: "",
                description: "",
                link: ""
            }],
            isLoaded: false
        }
    }

    async componentDidMount() {
        let links 
        
        try {
            links = await getLinks();
        } catch(error) {
            console.error(error);
        }

        if(links !== null) {
            if(links.data.links !== undefined) {
                this.setState({ linksList: links.data.links, isLoaded: true })
            }
        }
    } 

    render() {
        if(!this.state.isLoaded) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else {
            return (
                <div className="links-page-view">
                    <h1>
                        View Links
                    </h1>
                    {this.state.linksList.map((x, i) => {
                        return (
                            <section key={i}>
                                <h2>
                                    { x.title }
                                </h2>
                                <div className="description">
                                    <h3>
                                        Description:
                                    </h3>
                                    <p>
                                        { x.description }
                                    </p>
                                </div>
                                <div className="link">
                                    <h3>
                                        Link:
                                    </h3>
                                    <a href={ x.link }> 
                                        { x.link} 
                                    </a>
                                </div>
                            </section>
                        )
                    })
                    }
                </div>
            )
        }
    }
}
