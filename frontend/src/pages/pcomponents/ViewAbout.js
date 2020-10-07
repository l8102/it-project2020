import React, { Component } from "react";
import "../../css/Portfolio.css"
import { getAboutMe } from "../../Api.js"


export default class ViewAbout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institution: "",
            degree: "",
            major: "",
            
            experienceList: [{
                experience: "",
                dateFrom: "",
                dateTo: ""
            }],

            interestList: [""],
            description: "",
            isLoaded: false
        }
    }

    
    // Get about components from api and assign data 
    // to be recorded in 'this.state'
    async componentDidMount() {

        let aboutMe;

        try {
            aboutMe = await getAboutMe();
        } catch (error) {
            console.error(error);
        }

        console.log(aboutMe.data);

        // ensure that there is data
        if (aboutMe.data.workExperience !== undefined) {
            this.setState({
                experienceList: aboutMe.data.workExperience
            })
        }

        // ensure that there is data
        if (aboutMe.data.interests !== undefined) {
            this.setState({
                interestList: aboutMe.data.interests
            })
        }

        this.setState({
            institution: aboutMe.data.institution,
            degree: aboutMe.data.degree,
            major: aboutMe.data.major,
            description: aboutMe.data.description,

            isLoaded: true
        })
        console.log(this.state);


    }





    render() {
        if (!this.state.isLoaded) {
            return (
              <div>
                  Loading...
              </div>
            )
        } else {
            return (
              <div className="about-me-page">
                  <h1>
                      View About
                  </h1>
                  <section>
                      <h2>
                          Educational Background
                      </h2>
                      <label>
                          Institution:
                      </label>
                      <p>
                          {this.state.institution}
                      </p>
                      <label>
                          Degree:
                      </label>
                      <p>
                          {this.state.degree}
                      </p>
                      <label>
                          Major:
                      </label>
                      <p>
                          {this.state.major}
                      </p>
                  </section>
                  <section>
                      <h2>
                          Work Experience/Internships
                      </h2>

                      {
                          <div className="list-table">
                              <table>
                                  <tbody>
                                  <tr>
                                      <th>
                                          Experience:
                                      </th>
                                      <th>
                                          Date Started:
                                      </th>
                                      <th>
                                          Date Finished:
                                      </th>
                                  </tr>
                                  {this.state.experienceList.map((x, i) => {
                                      return (
                                        <tr key={i}>
                                            <td className="experience-col">
                                                {x.experience}
                                            </td>
                                            <td>
                                                {x.dateFrom}
                                            </td>
                                            <td>
                                                {x.dateTo}
                                            </td>
                                        </tr>
                                      )
                                  })
                                  }
                                  </tbody>
                              </table>
                          </div>
                      }
                  </section>
                  <section>
                      <h2>
                          Interests
                      </h2>
                      {
                          <div className="list-table">
                              <table>
                                  <tbody>
                                  {this.state.interestList.map((x, i) => {
                                      return (
                                        <tr key={i}>
                                            <td>
                                                {x}
                                            </td>
                                        </tr>
                                      )
                                  })}
                                  </tbody>
                              </table>
                          </div>
                      }
                  </section>
                  <section>
                      <h2>
                          About 'Name'
                      </h2>
                      <p className="description">
                          {this.state.description}
                      </p>
                  </section>
              </div>
            )
        }
    }
}
