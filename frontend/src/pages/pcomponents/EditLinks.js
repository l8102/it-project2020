import React, {Component} from "react";
import {updateLinks, getLinks} from "../../Api.js"
import "../../css/AboutLinks.css";

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
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderLinks = this.renderLinks.bind(this);
  }

  /* The method for having dynamic additional/removable input fields was taken and adapted from
  https://www.cluemediator.com/add-or-remove-input-fields-dynamically-with-reactjs
  */

  handleChange(e, i) {
    const {name, value} = e.target;
    const list = [...this.state.linksList];
    list[i][name] = value;
    this.setState({linksList: list});
  }


  handleRemove(e, i) {
    e.preventDefault();
    const list = [...this.state.linksList];
    list.splice(i, 1);
    this.setState({linksList: list});
  }

  handleAdd(e) {
    e.preventDefault()
    const list = [...this.state.linksList, {title: "", description: "", link: ""}]
    this.setState({linksList: list});
  }

  async handleSubmit(e) {
    e.preventDefault();

    let list = []

    for (var i = 0; i < this.state.linksList.length; i++) {
      // If all fields are empty, the entry is not saved to the database
      if (this.state.linksList[i].title !== "" && this.state.linksList[i].description !== "" && this.state.linksList[i].link !== "") {
        list.push(this.state.linksList[i]);
      } else {
        // todo handle for deletion separately

        // If it's not the last link and it is empty, alert the user
        if (i !== this.state.linksList.length - 1) {
          alert("Link not added, all fields must be entered.")
        }
      }
    }

    await this.setState({linksList: list});
    await updateLinks(this.state);

    // Re render the component
    await this.renderLinks();

    // sessionStorage.setItem("activeTab", this.props.name);
    // window.location.reload();
  }

  async componentDidMount() {
    await this.renderLinks();
  }

  async renderLinks() {
    let res

    try {
      res = await getLinks();
    } catch (error) {
      console.error(error);
    }

    if (res != null) {
      this.setState({isLoaded: true})
      if (res.data.links !== undefined && res.data.links.length !== 0) {
        console.log(res.data.links);
        let links = [];
        (res.data.links).forEach((element, i) => {
          links[i] = {title: element.title, description: element.description, link: element.link};
        });

        if (links[0].title !== "" && links[0].description !== "" && links[0].link !== "") {
          this.setState({linksList: [...links, {title: "", description: "", link: ""}]})
        }
      }
    }
  }

  render() {
    // if(!this.state.isLoaded) {
    //     return (
    //         <div>
    //             Loading...
    //         </div>
    //     )
    // } else {
    return (
      <div className="links-page">
        <h1>
          Edit Links
        </h1>
        <form>
          {this.state.linksList.map((x, i) => {
            return (
              <div key={i}>
                <section className="links-page-view">
                  <label>
                    Title:
                  </label>
                  <input
                    name="title"
                    value={x.title}
                    onChange={e => this.handleChange(e, i)}
                  />
                  <label>
                    Description:
                  </label>
                  <textarea
                    className="text-box"
                    name="description"
                    value={x.description}
                    onChange={e => this.handleChange(e, i)}
                  />
                  <label>
                    Link:
                  </label>
                  <input
                    name="link"
                    value={x.link}
                    onChange={e => this.handleChange(e, i)}
                  />
                </section>
                <div className="add-remove-buttons">
                  {i !== this.state.linksList.length - 1 &&
                  <button className="save-btn" onClick={e => this.handleRemove(e, i)}>
                    Remove
                  </button>
                  }
                  {this.state.linksList.length - 1 === i &&
                  <button className="save-btn" onClick={this.handleAdd}>
                    Add Link
                  </button>
                  }
                </div>
              </div>
            );
          })}
          <button className="save-btn" onClick={this.handleSubmit}>
            Save
          </button>
        </form>
      </div>
    )
  }

  // }
}
