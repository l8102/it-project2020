import React, { Component } from "react";
import { updateLinks, getLinks } from "../../Api.js"
import "../../css/Portfolio.css";

export default class EditLinks extends Component {
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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    /* The method for having dynamic additional/removable input fields was taken and adapted from
    https://www.cluemediator.com/add-or-remove-input-fields-dynamically-with-reactjs 
    */

   handleChange(e, i) {
    const { name, value } = e.target;
    const list = [...this.state.linksList];
    list[i][name] = value;
    this.setState({ linksList: list });
}


    async handleRemove(e, i) {
        e.preventDefault();
        const list = [...this.state.linksList];
        list.splice(i, 1);
        await this.setState({ linksList: list });
        this.handleSubmit(e);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        let list = []
        
        for(var i = 0; i < this.state.linksList.length; i++) {
            console.log(this.state.linksList[i]);
            if(this.state.linksList[i].title !== "" && this.state.linksList[i].description !== "" && this.state.linksList[i].link !== "") {
                list.push(this.state.linksList[i]);
            }
        };

        if(list.length == 0) {
            list = [{title: "", description: "", link: "" }]
        }

        await this.setState({linksList: list});
        console.log(this.state);
        await updateLinks(this.state);
        this.setState({linksList: [...list, {title: "", description: "", link: "" }]})
    }

    async componentDidMount() {
        let res 
        
        try {
            res = await getLinks();
        } catch(error) {
            console.error(error);
        }

        if(res != null) {
            this.setState({ isLoaded: true })
            if(res.data.links !== undefined && res.data.links.length !== 0) {
                console.log(res.data.links);
                let links = [];
                (res.data.links).forEach((element, i) => {
                    links[i] = {title: element.title, description: element.description, link: element.link};
                });

                
                if(links[0].title !== "" && links[0].description !== "" && links[0].link !== "") {
                    this.setState({ linksList: [...links, { title: '', description: '', link: '' }] }) 
                } else {
                    this.setState({linksList: links});
                }
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
                    <h1>
                        Edit Links
                    </h1>
                    <form>
                        { this.state.linksList.map((x, i) => {
                            return (
                                <div key={ i }>
                                    <section className="links-page">
                                        <label>
                                            Title:
                                        </label>
                                        <input 
                                            name="title"
                                            value={ x.title }
                                            onChange = { e => this.handleChange(e, i) }
                                        />
                                        <label>
                                            Description:
                                        </label>
                                        <textarea 
                                            className="text-box"
                                            name="description"
                                            value={ x.description }
                                            onChange = { e => this.handleChange(e, i) }
                                        />
                                        <label>
                                            Link:
                                        </label>
                                        <input
                                            name="link"
                                            value={ x.link }
                                            onChange = { e => this.handleChange(e, i) }
                                        />
                                    </section>
                                    <div className="add-remove-buttons">
                                        { i !== this.state.linksList.length - 1 &&
                                            <button className="add-remove-button" onClick={ e => this.handleRemove(e, i) } >
                                                Remove
                                            </button>
                                        }
                                        { i !== this.state.linksList.length - 1 &&
                                            <button className="add-remove-button" onClick={ this.handleSubmit }>
                                                Save
                                            </button>
                                        }
                                        { this.state.linksList.length - 1 === i &&
                                            <button className="add-remove-button" onClick={ this.handleSubmit }>
                                                Add 
                                            </button>
                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </form>
                </div>
            )
        }
    }
}
