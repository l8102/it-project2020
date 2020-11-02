import React, {Component} from "react";
import {getLinks} from "../../Api.js";
import "../../css/AboutLinks.css";
import validator from "validator";

export default class ViewLinks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      linksList: [{
        title: "",
        description: "",
        link: ""
      }],
    }
    this.formatURL = this.formatURL.bind(this);
  }

  // When the component loads, fetch the links data from the database
  async componentDidMount() {
    let links

    try {
      links = await getLinks();
    } catch (error) {
      console.error(error);
    }

    if (links !== null) {
      if (links.data.links !== undefined) {
        this.setState({
          linksList: links.data.links
        })
      }
    }
  }

  formatURL(link) {

    let url;

    // Checks if URL is already in correct format e.g. https://www.example.com,
    if (validator.isURL(link, {require_protocol: true})) {
      url = link;
      // If not, the URL is appended with "https://" protocol by default
    } else {
      url = "https://" + link;
    }

    return (
      <a href={url} target="_blank">
        {link}
      </a>
    )
  }

  render() {
    // If there are no links, render "None"
    if (this.state.linksList[0] === undefined) {
      return (
        <div
          className="links-page"
          style={{
            paddingBottom: "40px"
          }}
        >
          <h1>
            View Links
          </h1>
          None
        </div>
      )

    // Otherwise render the links from the database, stored in the linksList
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
                  {x.title}
                </h2>
                <div className="description">
                  <h3>
                    Description:
                  </h3>
                  <p>
                    {x.description}
                  </p>
                </div>
                <div className="link">
                  <h3>
                    Link:
                  </h3>
                  {this.formatURL(x.link)}
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
