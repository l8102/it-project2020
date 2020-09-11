import React from "react";
import "../../css/Portfolio.css"

export default function About() {
    return (
        <div className="about-me-page">
            <h1>
                About Me
            </h1>
            <form>
                <label>
                    Educational Background
                </label>
                <section className="educational-history">
                    <label>
                        Institution:
                    </label>
                    <textarea className="small-text-box" />
                    <label> 
                        Degree: 
                    </label>
                    <textarea className="small-text-box" />  
                    <label> 
                        Major: 
                    </label> 
                    <textarea className="small-text-box" />
                </section>
                <label>
                    About 'Name'
                </label>
                <section className="description">
                    <textarea className="text-box"
                        placeholder="Describe yourself here..."/>
                </section>
                <button className="save-btn-tab">
                    Save
                </button>
            </form>
        </div>
    );
}