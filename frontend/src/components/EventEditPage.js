import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import EventHero from "./subComponents/eventHero";
import { getCurrentEvent } from '../actions';


class eventEditPage extends Component {

    componentWillMount = () => {

        this.props.getCurrentEvent(this.props.match.params.id);
    }

    render(){
        return(
            <div className="eventEditPage container">
                <div className="eventDescription">

                    <h1 className="title eventTitle has-text-centered columns is-mobile">
                        <div className="field column is-half is-offset-one-quarter">
                            <label className="label">Event Name</label>
                            <div className="control">
                                <input className="input" value={this.props.selectedEvent.eventName} name="userName" type="text" placeholder="User Name Here" />
                            </div>
                        </div>
                    </h1>

                    <br />

                    <div className="container">
                        <div className="content">
                            <h4 className="title is-4">Description</h4>
                            <div className="control">
                                <textarea className="textarea" placeholder="This party is lit...." name="eventDescription" value={this.props.selectedEvent.eventDescription}></textarea>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="container">
                        <div className="content">
                            <h4 className="title is-4">Location</h4>
                            <div className="field">
                                <p className="is-marginless">Street Address</p>
                                <div className="control">
                                    <input className="input" value={this.props.selectedEvent.eventStreetAddress} name="userName" type="text" placeholder="User Name Here" />
                                </div>
                            </div>

                            <div className="field">
                                <p className="">City, State</p>
                                <div className="columns">
                                    <div className="column is-2 control">
                                        <input className="input" value={this.props.selectedEvent.eventCity} name="userName" type="text" placeholder="User Name Here" />
                                    </div>
                                    
                                    <div className="column is-1 control">
                                        <input className="input" value={this.props.selectedEvent.eventState} name="userName" type="text" placeholder="User Name Here" />
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <p className="is-marginless">ZipCode</p>
                                <div className="control">
                                    <input className="input" value={this.props.selectedEvent.eventZipCode} name="userName" type="text" placeholder="User Name Here" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="container">
                        <div className="content">
                            <h4 className="title is-4">Date</h4>
                            
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
                    <div className="field is-grouped is-grouped-right">
                        <p className="control">
                            <a className="button is-info" onClick={this.onSubmit}>
                                Submit
                            </a>
                        </p>
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        selectedEvent: state.selectedEvent.selectedEvent
    }
}

export default withRouter(connect(mapStateToProp, {
    getCurrentEvent: getCurrentEvent
})(eventEditPage));