import React, { Component } from "react";
import { updateLinks } from "../../Api.js"
import "../../css/Portfolio.css";

export default class EditLinks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            additionals: [{
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
    const list = [...this.state.additionals];
    list[i][name] = value;
    this.setState({ additionals: list });
}

    handleAdd(e) {
        e.preventDefault();
        this.setState({ additionals: [...this.state.additionals, { title: '', description: '', link: '' }] })
    }

    handleRemove(e, i) {
        e.preventDefault();
        const list = [...this.state.additionals];
        list.splice(i, 1);
        this.setState({ additionals: list })
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
                    Edit Additional
                </h1>
                <form>
                    { this.state.additionals.map((x, i) => {
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
                                    { this.state.additionals.length !== 1 &&
                                        <button className="add-remove-button" onClick={ e => this.handleRemove(e, i) } >
                                            Remove
                                        </button>
                                    }
                                    { this.state.additionals.length - 1 === i &&
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
