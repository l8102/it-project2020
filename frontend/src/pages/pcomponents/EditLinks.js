import React, { Component } from "react";
import { updateLinks } from "../../Api.js"
import "../../css/Portfolio.css";

export default class EditLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linksList: [{
                title: "",
                description: "",
                link: ""
            }]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
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

    handleAdd(e) {
        e.preventDefault();
        this.setState({ linksList: [...this.state.linksList, { title: '', description: '', link: '' }] })
    }

    handleRemove(e, i) {
        e.preventDefault();
        const list = [...this.state.linksList];
        list.splice(i, 1);
        this.setState({ linksList: list })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);

        updateLinks(this.state);
    }
   
    render() {
        return (
            <div>
                <h1>
                    Edit Links
                </h1>
                <form>
                    { this.state.linksList.map((x, i) => {
                        return (
                            <div key={ i }>
                                <label>
                                    Title
                                </label>
                                <input
                                    name="title"
                                    value={ x.title }
                                    onChange = { e => this.handleChange(e, i) }
                                />
                                <label>
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={ x.description }
                                    onChange = { e => this.handleChange(e, i) }
                                />
                                <label>
                                    Link
                                </label>
                                <input
                                    name="link"
                                    value={ x.link }
                                    onChange = { e => this.handleChange(e, i) }
                                />
                                <div>
                                    { this.state.linksList.length !== 1 &&
                                        <button className="add-remove-button" onClick={ e => this.handleRemove(e, i) } >
                                            Remove
                                        </button>
                                    }
                                    { this.state.linksList.length - 1 === i &&
                                        <button className="add-remove-button" onClick={ this.handleAdd }>
                                            Add 
                                        </button>
                                    }
                                </div>
                            </div>
                        );
                    })}
                    <button onClick={ this.handleSubmit }>
                        Save
                    </button>
                </form>
            </div>
        )
    }
}
