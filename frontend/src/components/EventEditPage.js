import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import EventHero from "./subComponents/eventHero";
import { getCurrentEvent } from '../actions';
import { updateCurrentEvent } from '../actions';


class eventEditPage extends Component {

    state = {
        eventName: "",
        eventImage: "",
        eventDescription: "",
        eventStreetAddress: "",
        eventState: "",
        eventCity: "",
        eventZipCode: "",
        eventDate: ""
    }

    componentWillMount = () => {
        if(this.props.match.params.id){
            this.props.getCurrentEvent(this.props.match.params.id);
        }
    }

    handleInputChanges = (e) => {
        this.setState({[e.target.name]: e.target.value});
        //console.log(this.state.eventName);  
    }

    onSubmit = (e) => {
        e.preventDefault();

        //onsubmit the data that I will pass in
        const event = {
            eventName: this.state.eventName,
            eventImage: this.state.eventImage,
            eventDescription: this.state.eventDescription,
            eventStreetAddress: this.state.eventStreetAddress,
            eventState: this.state.eventState,
            eventCity: this.state.eventCity,
            eventZipCode: this.state.eventZipCode,
            eventID: this.props.match.params.id,
            eventDate: this.state.eventDate
        }

        this.props.updateCurrentEvent(event, this.props.history);
    }

    componentWillReceiveProps = (nextProps) => {

        //nextProps gives us the next prop that was added with our action called in componentWillMount
        //check if the next Prop is there
        if(nextProps.selectedEvent){
            
            const currentEvent = nextProps.selectedEvent;

            this.setState({
                eventName: currentEvent.eventName,
                eventImage: currentEvent.eventImage,
                eventDescription: currentEvent.eventDescription,
                eventStreetAddress: currentEvent.eventStreetAddress,
                eventState: currentEvent.eventState,
                eventCity: currentEvent.eventCity,
                eventZipCode: currentEvent.eventZipCode
            });
        }
    }

    render(){
        return(
            <div className="eventEditPage container">
                <div className="eventDescription">

                    <h1 className="title eventTitle has-text-centered columns is-mobile">
                        <div className="field column is-half is-offset-one-quarter">
                            <label className="label">Event Name</label>
                            <div className="control">
                                <input className="input" defaultValue={this.state.eventName} name="eventName" type="text" onChange={this.handleInputChanges} />
                            </div>
                        </div>
                    </h1>
                    <br />

                    <div className="container">
                        <div className="content">
                            <h4 className="title is-4">Image URL</h4>

                            <div className="columns">
                                    <div className="column control">
                                        <input className="input" value={this.state.eventImage} name="eventImage" type="text" onChange={this.handleInputChanges} />
                                    </div>
                            </div>

                        </div>
                    </div>
                    <hr/>


                    <div className="container">
                        <div className="content">
                            <h4 className="title is-4">Description</h4>
                            <div className="control">
                                <textarea className="textarea" name="eventDescription" value={this.state.eventDescription} onChange={this.handleInputChanges}></textarea>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="container">
                        <div className="content">
                            <h4 className="title is-4">Location</h4>
                            <div className="field">
                                <p className="is-marginless">Street Address</p>

                                <div className="columns">
                                    <div className="column is-3 control">
                                        <input className="input" value={this.state.eventStreetAddress} name="eventStreetAddress" type="text" onChange={this.handleInputChanges} />
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <p className="">City, State</p>
                                <div className="columns">
                                    <div className="column is-2 control">
                                        <input className="input" value={this.state.eventCity} name="eventCity" type="text" onChange={this.handleInputChanges}/>
                                    </div>
                                    
                                    <div className="column is-1 control">
                                        <input className="input" value={this.state.eventState} name="eventState" type="text" onChange={this.handleInputChanges}/>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <p className="is-marginless">ZipCode</p>
                                <div className="columns">
                                    <div className="column is-2 control">
                                        <input className="input" value={this.state.eventZipCode} name="eventZipCode" type="text" onChange={this.handleInputChanges}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="container">
                        <div className="content">
                            <h4 className="title is-4">Date</h4>

                            <div className="field">
                                <div className="columns">
                                    <div className="is-3 column">
                                        <div className="control">
                                            <input className="input" type="date" placeholder="" name="eventDate" onChange={this.handleInputChanges} />
                                        </div>
                                        <p className="help"></p>
                                    </div>
                                </div>
                            </div>

                            
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
                            <a className="button is-warning" onClick={this.onSubmit}>
                                Delete Event
                            </a>
                        </p>
                        <p className="control">
                            <a className="button is-info" onClick={this.onSubmit}>
                                Submit Changes
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
    getCurrentEvent: getCurrentEvent,
    updateCurrentEvent: updateCurrentEvent
})(eventEditPage));