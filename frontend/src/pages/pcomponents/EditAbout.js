import React, { Component } from "react";
import "../../css/AboutLinks.css";
import { updateAboutMe, getAboutMe } from "../../Api.js"
import { Timestamp } from "mongodb";

export default class EditAbout extends Component {
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

        this.originalState = {
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
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleExperienceChange = this.handleExperienceChange.bind(this);
        this.handleAddExperience = this.handleAddExperience.bind(this);
        this.handleRemoveExperience = this.handleRemoveExperience.bind(this);

        this.handleInterestChange = this.handleInterestChange.bind(this);
        this.handleAddInterest = this.handleAddInterest.bind(this);
        this.handleRemoveInterest = this.handleRemoveInterest.bind(this);

    }

    /* The method for having dynamic additional/removable input fields was taken and adapted from
    https://www.cluemediator.com/add-or-remove-input-fields-dynamically-with-reactjs 
    */

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();

        // changedInput refers to the component that is being saved onto the database
        let changedInput = e.target.name;

        // newState being saved onto the database is initialised to it's current state on the database
        let newState = this.originalState;
        let i = 0;

        // this.state represents any changed input, and new state is assigned a changed input depending on
        // the component(s) being saved by the user

        if(changedInput === "educationalBackground" || changedInput === "saveAll") {
            newState.institution = this.state.institution;
            newState.degree = this.state.degree;
            newState.major = this.state.major;
        } 
        
        if(changedInput === "description" || changedInput === "saveAll") {
            newState.description = this.state.description;
        } 
            
        if (changedInput === "interestList" || changedInput === "saveAll") {
            let interests = []
            for (i = 0; i < this.state.interestList.length; i++) {
                // If input is empty, it is not saved onto the database
                if (this.state.interestList[i] !== "") {
                    interests.push(this.state.interestList[i]);
                }
            };

            if (interests.length === 0) {
                interests = [""]
            }

            newState.interestList = interests;
        } 

        if (changedInput === "experienceList" || changedInput === "saveAll") {
            let experiences = []
            for (i = 0; i < this.state.experienceList.length; i++) {
                // If experience is empty, it is not saved onto the database
                if (this.state.experienceList[i].experience !== "") {
                    experiences.push(this.state.experienceList[i]);
                }
            };

            if (experiences.length === 0) {
                experiences = [{ experience: "", dateFrom: "", dateTo: "" }];
            }
            newState.experienceList = experiences;
        }

        // Save information to database
        console.log("saved" + newState.experienceList);
        await this.setState(newState);
        updateAboutMe(this.state);
        // Stores tab, so default tab is set to about on refresh
        sessionStorage.setItem("activeTab", this.props.name);
        window.location.reload();
    }

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
                console.log(element);
                dateFrom = element.dateFrom;
                dateTo = element.dateTo;

                // When date is retrieved from the database, if empty it is retrieved as null
                // in EditAbout it is stored as an empty string
                if(dateFrom === null) {
                    dateFrom = "";
                }
                if(dateTo === null) {
                    dateTo = "";
                }

                experiences[i] = { experience: element.experience, dateFrom: dateFrom, dateTo: dateTo };
            });

            
            if (experiences[0].experience !== "") {
                this.setState({ experienceList: [...experiences, { experience: "", dateFrom: "", dateTo: "" }] })
                this.originalState.experienceList = experiences;
            } 
        }

        // ensure that there is data
        if (aboutMe.data.interests !== undefined && aboutMe.data.interests.length !== 0) {
            let interests = aboutMe.data.interests;

            if (interests[0] !== "") {
                this.setState({ interestList: [...interests, ""] })
                this.originalState.interestList = interests;
            } 
        }

        this.setState({
            institution: aboutMe.data.institution,
            degree: aboutMe.data.degree,
            major: aboutMe.data.major,
            description: aboutMe.data.description,

            isLoaded: true
        })

        this.originalState.institution = aboutMe.data.institution;
        this.originalState.degree = aboutMe.data.degree;
        this.originalState.major = aboutMe.data.major;
        this.originalState.description = aboutMe.data.description;
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

    handleAddExperience(e) {
        e.preventDefault()
        const list = [...this.state.experienceList, {experience: "", dateFrom: "", dateTo: ""}]
        this.setState({ experienceList: list })
    }

    handleRemoveExperience(e, i) {
        e.preventDefault();
        const list = [...this.state.experienceList];
        list.splice(i, 1);
        this.setState({ experienceList: list });
    }


    /*-----------------------------------------------------------------------
        interestList - Following functions handle the list of interests
    ------------------------------------------------------------------------*/

    handleInterestChange(e, i) {
        const list = [...this.state.interestList];
        list[i] = e.target.value;
        this.setState({ interestList: list});
    }

    handleAddInterest(e) {
        e.preventDefault()
        const list = [...this.state.interestList, ""];
        this.setState({ interestList: list });
    }

    handleRemoveInterest(e, i) {
        e.preventDefault();
        const list = [...this.state.interestList];
        list.splice(i, 1);
        this.setState({ interestList: list });
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
                <div className="about-me-page">
                    <h1>
                        Edit About
                    </h1>
                    <form>
                        <section>
                            <h2>
                                Educational Background
                                </h2>
                            <label>
                                Institution:
                                </label>
                            <input className="education"
                                name="institution"
                                value={this.state.institution}
                                onChange={ this.handleChange }
                            />
                            <label>
                                Degree:
                                </label>
                            <input className="education"
                                name="degree"
                                value={this.state.degree}
                                onChange={ this.handleChange }
                            />
                            <label>
                                Major:
                                </label>
                            <input className="education"
                                name="major"
                                value={this.state.major}
                                onChange={ this.handleChange }
                            />
                            <button className="save-btn-tab" name="educationalBackground" onClick={ this.handleSubmit }>
                                Save
                            </button>
                        </section>
                        <section>
                            <h2>
                                Work Experience/Internships
                            </h2>
                            {this.state.experienceList.map((x, i) => {
                                return (
                                    <div key={i}>
                                        <input className="experience"
                                            name="experience"
                                            value={x.experience}
                                            onChange={e => this.handleExperienceChange(e, i)}
                                        />
                                        <input className="date"
                                            name="dateFrom"
                                            type="date"
                                            value={x.dateFrom}
                                            onChange={e => this.handleExperienceChange(e, i)}
                                        />
                                        <input className="date"
                                            name="dateTo"
                                            type="date"
                                            value={x.dateTo}
                                            onChange={e => this.handleExperienceChange(e, i)}
                                        />
        
                                        <div>
                                            {i !== this.state.experienceList.length - 1 &&
                                                <button className="add-remove-button" onClick={ e => this.handleRemoveExperience(e, i) } >
                                                    Remove Experience
                                                </button>
                                            }
                                            {this.state.experienceList.length - 1 === i &&
                                                <button className="add-remove-button" onClick={ this.handleAddExperience }>
                                                    Add Experience
                                                </button>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                            <button className="save-btn-tab" name="experienceList" onClick={ this.handleSubmit }>
                                Save
                            </button>
                        </section>
                        <section >
                            <h2>
                                Interests
                                </h2>
                            {this.state.interestList.map((x, i) => {
                                return (
                                    <div key={i}>
                                        <input className="interest"
                                            name="interest"
                                            value={ x }
                                            onChange={ e => this.handleInterestChange(e, i) }
                                        />
                                        <div >
                                            { this.state.interestList.length !== 1 &&
                                                <button onClick={ e => this.handleRemoveInterest(e, i) } >
                                                    Remove interest
                                                    </button>
                                            }
                                            { this.state.interestList.length - 1 === i &&
                                                <button name="interestList" onClick={ this.handleAddInterest }>
                                                    Add interest
                                                </button>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                            <button className="save-btn-tab" name="interestList" onClick={ this.handleSubmit }>
                                Save
                            </button>
                        </section>
                        <section>
                            <h2>
                                About 'Name'
                            </h2>
                            <textarea className="text-box"
                                name="description"
                                placeholder="Describe yourself here..."
                                value={ this.state.description }
                                onChange={ this.handleChange }
                            />
                            <button className="save-btn-tab" name="description" onClick={ this.handleSubmit }>
                                Save
                            </button>
                        </section>
                        <button className="save-btn-tab" name="saveAll" onClick={ this.handleSubmit }>
                            Save All
                        </button>
                    </form>
                </div>
            )
        }
    }
}