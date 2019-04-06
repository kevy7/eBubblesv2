import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import EventHero from "./subComponents/eventHero";

class eventEditPage extends Component {

    render(){
        return(
            <div className="eventEditPage">
                <div className="eventDescription">

                    <h1 className="title eventTitle has-text-centered columns is-mobile">
                        <div className="field column is-half is-offset-one-quarter">
                            <label className="label">Event Name</label>
                            <div className="control">
                                <input className="input" value="" name="userName" type="text" placeholder="User Name Here" />
                            </div>
                        </div>
                    </h1>

                    <br />

                    <div className="container">
                        <div className="content">
                            <h4 className="title is-4">Description</h4>
                            <p className="is-marginless"></p>
                        </div>
                    </div>
                    <hr />
                    <div className="container">
                        <div className="content">
                            <h4 className="title is-4">Location</h4>
                            <p className="is-marginless">Street Address</p>
                            <p className="is-marginless">City, State</p>
                            <p className="is-marginless">ZipCode</p>
                        </div>
                    </div>
                    <hr />

                    <div className="container">
                        <div className="content">
                            <h4 className="title is-4">Date</h4>
                            <p>Date Placed Here</p>
                        </div>
                    </div>
                    <hr />

                    <div className="container">
                        <div className="content">
                            <h4 className="title -s-4">Photos</h4>
                        </div>
                    </div>
                    <hr />

                    <div className="container">
                        <div className="content">
                            <h4 className="title -s-4">Friends</h4>
                        </div>
                    </div>
                    <hr />

                    <div className="container">
                        <div className="content">
                            <h4 className="title -s-4">Comments</h4>
                        </div>
                    </div>
                    <br /> 
                </div>
            </div>
        )
    }
}



export default eventEditPage;