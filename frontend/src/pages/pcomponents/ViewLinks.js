import React, { Component } from "react";
import { getLinks } from "../../Api.js";
import "../../css/Portfolio.css"

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

        if(links != null) {
            if(links.data.links != undefined) {
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
                <div className="links-page">
                    {this.state.linksList.map((x, i) => {
                        return (
                            <section key={i}>
                                <label>
                                    Title:
                                </label>
                                <h3>
                                    { x.title }
                                </h3>
                                <label>
                                    Description:
                                </label>
                                <p>
                                    { x.description }
                                </p>
                                <label>
                                    Link:
                                </label>
                                <a href={ x.link }> 
                                    { x.link} 
                                </a>
                            </section>
                        )
                    })
                    }
                </div>
            )
        }
    }
}
