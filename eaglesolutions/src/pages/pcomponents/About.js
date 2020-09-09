import React from "react";
import "../../css/Portfolio.css"
export default function About() {
    
    return (
        <div>
            <h1>
                About Me
            </h1>
            <form>
                <textarea classname="text-box" 
                    placeholder="Describe yourself here..."/>
                <button className="save-btn-tab">
                    Save
                </button>
            </form>
        </div>
    );
}