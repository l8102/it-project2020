import React, { Component } from "react";
import "../../css/AboutLinks.css";
import moment from "moment";
import { getAboutMe } from "../../Api.js";


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
      isLoaded: false,
    }
  }

// Get about components from api and assign data
  // to be recorded in 'this.state'
async componentDidMount() {
        let aboutMe;
        let dateTo;
        let dateFrom;
        
        try {
            aboutMe = await getAboutMe();
        } catch (error) {
            console.error(error);
        }

        // ensure that there is data
        if (aboutMe.data.workExperience !== undefined && aboutMe.data.workExperience.length !== 0) {
            let experiences = [];
            (aboutMe.data.workExperience).forEach((element, i) => {
                dateFrom = element.dateFrom;
                dateTo = element.dateTo;

                // When date is retrieved from the database, if empty it is retrieved as null
                // in EditAbout it is stored as an empty string
                if(dateFrom === null) {
                    dateFrom = "";
                } else {
                    dateFrom = moment(dateFrom).utc().format("YYYY-MM-DD");
                }
                if(dateTo === null) {
                    dateTo = "";
                } else {
                    dateTo = moment(dateTo).utc().format("YYYY-MM-DD");
                }

                experiences[i] = { experience: element.experience, dateFrom: dateFrom, dateTo: dateTo };
            });

            
            if (experiences[0].experience !== "") {
                this.setState({ experienceList: [...experiences, { experience: "", dateFrom: "", dateTo: "" }] })
            } 
        }

        // ensure that there is data
        if (aboutMe.data.interests !== undefined && aboutMe.data.interests.length !== 0) {
            let interests = aboutMe.data.interests;

            if (interests[0] !== "") {
                this.setState({ interestList: [...interests, ""] })
            } 
        }

        this.setState({
            institution: aboutMe.data.institution,
            degree: aboutMe.data.degree,
            major: aboutMe.data.major,
            description: aboutMe.data.description,

            isLoaded: true
        })
  }


  render() {
    // if (!this.state.isLoaded) {
    //   return (
    //     <div>
    //       Loading...
    //     </div>
    //   )
    // } else {
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
              About { this.props.firstName }
            </h2>
            <p className="description">
              {this.state.description}
            </p>
          </section>
        </div>
      )
    }
  // }
}
