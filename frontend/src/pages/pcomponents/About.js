import React, { Component } from "react";
import "../../css/Portfolio.css";

export default class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            educationalBackground: {
                institution: "",
                degree: "",
                major: ""
            },
            experienceList: [{
                experience: "",
                dateFrom: "",
                dateTo: ""
            }],
            interestList: [{
                interest: ""
            }],
            description: ""
        }

        this.handleChange = this.handleChange.bind(this);

        this.handleExperienceChange = this.handleExperienceChange.bind(this);
        this.handleRemoveExperience = this.handleRemoveExperience.bind(this);
        this.handleAddExperience = this.handleAddExperience.bind(this);
        
        this.handleInterestChange = this.handleInterestChange.bind(this);
        this.handleRemoveInterest = this.handleRemoveInterest.bind(this);
        this.handleAddInterest = this.handleAddInterest.bind(this);
        
    }

    /* The method for having dynamic additional/removable input fields was taken and adapted from
    https://www.cluemediator.com/add-or-remove-input-fields-dynamically-with-reactjs 
    */

    // TODO: Look up keys for lists & check citing

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }


    /*-----------------------------------------------------------------------
        ExperienceList - Following functions handle the list of experiences
    ------------------------------------------------------------------------*/

    handleExperienceChange(e, i) {
        const { name, value } = e.target;
        const list = [...this.state.experienceList];
        list[i][name] = value;
        this.setState({ experienceList: list });
    }

    handleRemoveExperience(e, i) {
        e.preventDefault();
        const list = [...this.state.experienceList];
        list.splice(i, 1);
        this.setState({ experienceList: list });
    }

    handleAddExperience(e) {
        e.preventDefault();
        this.setState({ experienceList: [...this.state.experienceList, { experience: "", dateFrom: "", dateTo: "" }] });
    }

    /*-----------------------------------------------------------------------
        interestList - Following functions handle the list of interests
    ------------------------------------------------------------------------*/

    handleInterestChange(e, i) {
        const { name, value } = e.target;
        const list = [...this.state.interestList];
        list[i][name] = value;
        this.setState({ interestList: list });
    }

    handleRemoveInterest(e, i) {
        e.preventDefault();
        const list = [...this.state.interestList];
        list.splice(i, 1);
        this.setState({ interestList: list });
    }

    handleAddInterest(e) {
        e.preventDefault();
        this.setState({ interestList: [...this.state.interestList, { interest: "" }] });
    }

    render() {
        return (
            <div className="about-me-page">
                <h1>
                    About
                </h1>
                <form>
                    <div className="education-interests-experiences">
                        <section className="educational-background">
                            <h2>
                                Educational Background
                            </h2>
                            <label>
                                Institution:
                            </label>
                            <textarea className="small-text-box" 
                                name="institution" 
                                value={ this.state.educationalBackground.institution }
                                onChange={ this.handleChange } 
                            />
                            <label> 
                                Degree: 
                            </label>
                            <textarea className="small-text-box" 
                                name="degree"
                                value={ this.state.educationalBackground.degree }
                                onChange={ this.handleChange }
                            />  
                            <label> 
                                Major: 
                            </label> 
                            <textarea className="small-text-box"
                                name="major"
                                value={ this.state.educationalBackground.major }
                                onChange={ this.handleChange }
                            />
                        </section>
                        <section className="experience-list">
                            <h2>
                                Work Experience/Internships
                            </h2>
                                {this.state.experienceList.map((x, i) => {
                                    return (
                                        <div className="experiences">
                                            <input className="small-text-box"
                                                name="experience"
                                                value={x.experience}
                                                onChange={ e => this.handleExperienceChange(e, i) } 
                                            />
                                            <input 
                                                name="date-from"
                                                type="date"
                                                value={x.dateFrom}
                                                onChange={ e => this.handleExperienceChange(e, i) }
                                            />
                                            <input
                                                name="date-to"
                                                type="date"
                                                value={x.dateTo}
                                                onChange={ e => this.handleExperienceChange(e, i) }
                                            />
                                            <div className="addRemoveButtons">
                                                {this.state.experienceList.length !== 1 && 
                                                    <button onClick={ e => this.handleRemoveExperience(e, i) } >
                                                        Remove Experience
                                                    </button>
                                                }
                                                {this.state.experienceList.length - 1 === i && 
                                                    this.state.experienceList.length < 3 &&
                                                    <button onClick = { this.handleAddExperience }>
                                                        Add Experience
                                                    </button>
                                                }
                                            </div> 
                                        </div>
                                    )
                                })} 
                        </section>
                        <section className="interests-list">
                            <h2>
                                Interests
                            </h2>
                            {this.state.interestList.map((x, i) => {
                                return (
                                    <div className="interests">
                                        <input className="small-text-box"
                                            name="interest"
                                            value={x.interest}
                                            onChange={ e => this.handleInterestChange(e, i) } 
                                        />
                                        <div className="addRemoveButtons">
                                            {this.state.interestList.length !== 1 && 
                                                <button onClick={ e => this.handleRemoveInterest(e, i) } >
                                                    Remove interest
                                                </button>
                                            }
                                            {this.state.interestList.length - 1 === i && 
                                                this.state.interestList.length < 4 &&
                                                <button onClick = { this.handleAddInterest }>
                                                    Add interest
                                                </button>
                                            }
                                        </div> 
                                    </div>
                                )
                            })} 
                        </section>
                    </div>
                    <section className="description">
                        <h2>
                            About 'Name'
                        </h2>
                        <textarea className="text-box"
                            name="description"
                            placeholder="Describe yourself here..."
                            value={ this.state.description }
                            onChange={ this.handleChange }
                        />
                    </section>
                    <button className="save-btn-tab">
                        Save
                    </button>
                </form>
            </div>
        )
    }
}