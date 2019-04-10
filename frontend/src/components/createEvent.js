/*
This is the create event page 

note: I thin eventDate and eventZipCode are returned as strings rather than dates and numbers

createEventPage
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { postEvent } from '../actions';

class createEvent extends Component {

    state = {
        eventName: "",
        eventImage: "",
        eventDate: "", 
        eventStreetAddress: "",
        eventCity: "",
        eventState: "",
        eventZipCode: "",
        eventDescription: ""
    }

    handleInputChanges = (e) => {
        this.setState({[e.target.name]: e.target.value});
        //console.log(this.state.eventZipCode);
    }

    onSubmit = (e) => {
        e.preventDefault();

        //console.log(this.state);
        //api call will be made in here

        //console.log(this.props.auth.userInfo.id);
        const event = {
            eventName: this.state.eventName,
            eventImage: this.state.eventImage,
            eventDate: this.state.eventDate, 
            eventStreetAddress: this.state.eventStreetAddress,
            eventCity: this.state.eventCity,
            eventState: this.state.eventState,
            eventZipCode: this.state.eventZipCode,
            eventDescription: this.state.eventDescription,
            userName: this.props.auth.userInfo.name,
            userID: this.props.auth.userInfo.id

            
        }

        //console.log(event);

        this.props.postEvent(event, this.props.history);
        //console.log(event);
        
    }

    render(){
        return (
            <div className="createEvent">
                <div className="container column is-4 is-offset-4">
                    <h1 className="title">Add New Event</h1>

                    <div className="field">
                        <label className="label">Event Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="" name="eventName" value={this.state.eventName} onChange={this.handleInputChanges} />
                        </div>
                        <p className="help">Place errors in here</p>
                    </div>

                    <div className="field">
                        <label className="label">Event Image</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Paste image url here" name="eventImage" value={this.state.eventImage} onChange={this.handleInputChanges} />
                        </div>
                        <p className="help"></p>
                    </div>

                    <div className="field">
                        <label className="label">Event Date</label>
                        <div className="control">
                            <input className="input" type="date" placeholder="" name="eventDate" value={this.state.eventDate} onChange={this.handleInputChanges}/>
                        </div>
                        <p className="help"></p>
                    </div>

                    <div className="field">
                        <label className="label">Street Address</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="" name="eventStreetAddress" value={this.state.eventStreetAddress} onChange={this.handleInputChanges}/>
                        </div>
                        <p className="help"></p>
                    </div>

                    <div className="field">
                        <label className="label">City</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="" name="eventCity" value={this.state.eventCity} onChange={this.handleInputChanges}/>
                        </div>
                        <p className="help"></p>
                    </div>

                    <div className="field">
                        <label className="label">State</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="" name="eventState" value={this.state.eventState} onChange={this.handleInputChanges}/>
                        </div>
                        <p className="help"></p>
                    </div>

                    <div className="field">
                        <label className="label">Zip Code</label>
                        <div className="control">
                            <input className="input" type="number" placeholder="" name="eventZipCode" value={this.state.eventZipCode} onChange={this.handleInputChanges} />
                        </div>
                        <p className="help"></p>
                    </div>

                    <div className="field-body">
                        <div className="field">
                            <label className="label">Event Description</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="This party is lit...." name="eventDescription" value={this.state.eventDescription} onChange={this.handleInputChanges}></textarea>
                            </div>
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

//Set as null because I don't need any data from my state as of yet for this form
export default withRouter(connect(mapStateToProps, {
    postEvent: postEvent
})(createEvent));