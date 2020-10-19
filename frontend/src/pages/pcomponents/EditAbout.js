import React, { Component } from "react";
import "../../css/Portfolio.css";
import { updateAboutMe, getAboutMe } from "../../Api.js"

export default class EditAbout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institution: "",
            degree: "",
            major: "",
            
            experienceList: [{
                experience: "",
                dateFrom: undefined,
                dateTo: undefined
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
        this.handleRemoveExperience = this.handleRemoveExperience.bind(this);

        this.handleInterestChange = this.handleInterestChange.bind(this);
        this.handleRemoveInterest = this.handleRemoveInterest.bind(this);

    }

    /* The method for having dynamic additional/removable input fields was taken and adapted from
    https://www.cluemediator.com/add-or-remove-input-fields-dynamically-with-reactjs 
    */

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleSubmit(e, changedInput) {
        e.preventDefault();
        console.log(e.target);

        let newState = this.originalState;
       

        if(changedInput === "educationalBackground") {
            newState.institution = this.state.institution;
            newState.degree = this.state.degree;
            newState.major = this.state.major;
        } else if(changedInput === "description") {
            newState.description = this.state.description;
        } else {
            let list = []
            var i;
            if(changedInput === "interestList") {
                for (i = 0; i < this.state.interestList.length; i++) {
                    if (this.state.interestList[i] !== "") {
                        list.push(this.state.interestList[i]);
                    }
                };
                
                if (list.length === 0) {
                    list = [""]
                }

                newState.interestList = list;
            } else {
                for (i = 0; i < this.state.experienceList.length; i++) {
                    if (this.state.experienceList[i].experience !== "" && this.state.experienceList[i].dateFrom !== "" && this.state.experienceList[i].dateTo !== "") {
                        list.push(this.state.experienceList[i]);
                    }
                };

                if (list.length === 0) {
                    list = [{experience: "", dateFrom: "", dateTo: ""}];
                }
                newState.experienceList = list;
            }
            
        }
        // Save information to database
        await this.setState(newState);
        sessionStorage.setItem("activeTab", this.props.name);
        window.location.reload();
        await updateAboutMe(this.state);
    }

    async componentDidMount() {

        let aboutMe;

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
                experiences[i] = { experience: element.experience, dateFrom: element.dateFrom, dateTo: element.dateTo };
            });


            if (experiences[0].experience !== "") {
                this.setState({ experienceList: [...experiences, { experience: "", dateFrom: "", dateTo: "" }] })
                this.originalState.experienceList = experiences;
            } else {
                this.setState({ experienceList: [{ experience: "", dateFrom: "", dateTo: "" }] });
            }
        }

        // ensure that there is data
        if (aboutMe.data.interests !== undefined && aboutMe.data.interests.length !== 0) {
            let interests = [];
            (aboutMe.data.interests).forEach((element, i) => {
                interests[i] = element;
            });

            if (interests[0] !== "") {
                this.setState({ interestList: [...interests, ""] })
                this.originalState = interests;
            } else {
                this.setState({ interestList: [""] });
            }
        }

        await this.setState({
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

        console.log(this.state);
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

    async handleRemoveExperience(e, i, changedInput) {
        e.preventDefault();
        e.persist();
        const list = [...this.state.experienceList];
        list.splice(i, 1);
        await this.setState({ experienceList: list });
        this.handleSubmit(e, changedInput);
    }


    /*-----------------------------------------------------------------------
        interestList - Following functions handle the list of interests
    ------------------------------------------------------------------------*/

    handleInterestChange(e, i) {
        const list = [...this.state.interestList];
        list[i] = e.target.value;
        this.setState({ interestList: list});
    }

    async handleRemoveInterest(e, i, changedInput) {
        e.preventDefault();
        e.persist();
        const list = [...this.state.interestList];
        list.splice(i, 1);
        await this.setState({ interestList: list });
        this.handleSubmit(e, changedInput);
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
                            <button className="save-btn-tab" onClick={ e => this.handleSubmit(e, "educationalBackground") }>
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
                                            {this.state.experienceList.length !== 1 &&
                                                <button className="add-remove-button" onClick={ e => this.handleRemoveExperience(e, i, "experienceList") } >
                                                    Remove Experience
                                                </button>
                                            }
                                            {this.state.experienceList.length - 1 === i &&
                                                <button className="add-remove-button" onClick={e =>  this.handleSubmit(e, "experienceList") }>
                                                    Add Experience
                                                </button>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
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
                                                <button onClick={ e => this.handleRemoveInterest(e, i, "interestList") } >
                                                    Remove interest
                                                    </button>
                                            }
                                            { this.state.interestList.length - 1 === i &&
                                                <button name="interestList" onClick={ e => this.handleSubmit(e, "interestList") }>
                                                    Add interest
                                                </button>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
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
                            <button className="save-btn-tab" onClick={ e => this.handleSubmit(e, "description") }>
                            Save
                            </button>
                        </section>
                    </form>
                </div>
            )
        }
    }
}