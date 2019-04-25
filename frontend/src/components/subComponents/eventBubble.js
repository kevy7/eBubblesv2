/*
    This is your eventbubble component
        -You will need to display an array of these
    these event bubbles will display information about your event

    I'm going to add styles in the jsx elements event though it is not reccomended
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { deleteCurrentEvent } from '../../actions/index';
import { getEvents } from '../../actions/index';
import "../../styles/eventBubble.css";

class EventBubble extends Component {

    deleteEvent = (e) =>  {
        //e.preventDefault();

        const eventID = this.props.eventID;
        
        if (window.confirm("Are you sure you want to delete this event?")) {
            this.props.deleteCurrentEvent(eventID, this.props.history);
            this.props.getEvents();

            //console.log("You pressed the confirm button");
        } else {
            //console.log("You pressed the cancel button");
            //do nothing when user clicks cancel
        }

        //this.props.getEvents();
    }

    render() {

        if(!this.props.eventID){
            console.log("throw err");
        }
        const url = "/events/" + this.props.eventID
        const editURL = url + "/edit";

        const displayRemoveButton = () => {
            /*
                if the userid who created the event matches with the id of the currently logged in user, then display the following jsx code below

                <div className="navbar-end eventIcons">
                    <button className="far fa-edit editButton"></button>
                    <button className="delete"></button>
                </div>

                compare this.props.userInfo.id with this.props.userId

                I need to create my backend, where the user who created the event, their id is stored in there
            */
        }

        return (    
            <div className="eventBubble column is-one-quarter">
                <div className="navbar-end eventIcons">
                    <Link to={editURL} className="far fa-edit editButton"></Link>
                    <button className="delete" onClick={this.deleteEvent}></button>
                </div>
                
                <Link to={url}>
                    <figure className="image" style={{width: "180px", height: "180px", marginLeft: "auto", marginRight: "auto"}}>
                        <img 
                            className="is-rounded" 
                            style={{width: "180px", height: "180px"}}
                            src={this.props.img}
                        />
                        
                        <p className="subtitle is-6 has-text-centered eventTitle" style={{marginTop: "5px"}}>
                            {this.props.eventName}
                        </p>
                    </figure>
                    
                </Link>
                <br />
            </div>    
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.auth.userInfo
    }
}

export default withRouter(connect(mapStateToProps, {
    deleteCurrentEvent: deleteCurrentEvent,
    getEvents: getEvents
})(EventBubble));