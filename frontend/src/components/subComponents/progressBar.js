import React, { Component } from "react";

class progressBar extends Component {
    render(){
        return (
            <div className="progBar">
                <progress className="progress is-large is-info" max="100">60%</progress>
            </div>
        )
    }
}

export default progressBar;


//return <progress class="progress is-large is-info" max="100">60%</progress>