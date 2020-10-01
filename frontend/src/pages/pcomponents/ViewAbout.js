import React, { Component } from "react";
import "../../css/Portfolio.css"
import "../../Api.js"


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
            description: ""
        }
    }

    /*
    // Get about components from api and assign data 
    // to be recorded in 'this.state'
    async componentDidMount() {

    }
    */

    // Might need to be async, need to test out api first
    render() {
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
                        {this.state.major}
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
                        <table>
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
                                    <tr>
                                        <td>
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
                        </table>
                    }
                </section>
                <section>
                    <h2>
                        Interests
                    </h2>
                    {
                        <table>
                            {this.state.interestList.map((x) => {
                                return(
                                    <tr>
                                        <td>
                                            {x}
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    }
                </section>
                <section>
                    <h2>
                        About 'Name'
                    </h2>
                    <p>
                        {this.state.description}
                    </p>
                </section>
            </div>
        )
    }
}
