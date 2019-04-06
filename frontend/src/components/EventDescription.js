/*
This is our events description page

we're getting an error within this page with our EventHero component
*/
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { getCurrentEvent } from '../actions';
import { removeCurrentEvent } from '../actions';

import EventHero from './subComponents/eventHero';

import "../styles/eventDescription.css";

class EventDescription extends Component {
    componentWillMount = () => {
        //This is soon going to be deprecated
        this.props.removeCurrentEvent(); //This will remove the selectedEvent from our state first before the render
            //In that way, we won't have previous data loaded in our eventDescriptions page
        this.props.getCurrentEvent(this.props.match.params.id);
    }

    componentDidMount = () => {
   }

    render(){
        //const { selectedEvent } = this.props.selectedEvent;
        //console.log(this.props.selectedEvent.selectedEvent.eventImage)
        const url = "/events/" + this.props.selectedEvent.selectedEvent._id + "/edit";
        return(
            <div className="eventDescription">
                <div className="columns is-mobile">
                    <h1 className="title eventTitle has-text-centered column is-11">
                        {this.props.selectedEvent.selectedEvent.eventName}
                    </h1>
                    <div className="column is-1 editButton">
                        <Link to={url} className="button">Edit</Link>
                    </div>
                </div>
                <EventHero />
                <br />
                <div className="container">
                    <div className="content">
                        <h4 className="title is-4">Description</h4>
                        <p className="is-marginless">{this.props.selectedEvent.selectedEvent.eventDescription}</p>
                    </div>
                </div>
                <hr />
                <div className="container">
                    <div className="content">
                        <h4 className="title is-4">Location</h4>
                        <p className="is-marginless">{this.props.selectedEvent.selectedEvent.eventStreetAddress}</p>
                        <p className="is-marginless">{this.props.selectedEvent.selectedEvent.eventCity}, {this.props.selectedEvent.selectedEvent.eventState}</p>
                        <p className="is-marginless">{this.props.selectedEvent.selectedEvent.eventZipCode}</p>
                    </div>
                </div>
                <hr />

                <div className="container">
                    <div className="content">
                        <h4 className="title is-4">Date</h4>
                        <p>{this.props.selectedEvent.selectedEvent.eventDate}</p>
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedEvent: state.selectedEvent
    }
}

export default withRouter(connect(mapStateToProps, {
    getCurrentEvent: getCurrentEvent,
    removeCurrentEvent: removeCurrentEvent
})(EventDescription));