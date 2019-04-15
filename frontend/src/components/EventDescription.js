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
import { addComment } from '../actions';

import EventHero from './subComponents/eventHero';
import EventComment from './subComponents/eventComment';

import "../styles/eventDescription.css";

class EventDescription extends Component {
    state = {
        comment: ""
    }

    componentWillMount = () => {
        
        //The code below is not needed, it seems my code still works
        //this.props.removeCurrentEvent(); //This will remove the selectedEvent from our state first before the render
            //In that way, we won't have previous data loaded in our eventDescriptions page
        
        this.props.getCurrentEvent(this.props.match.params.id);
    }

    componentWillReceiveProps = (nextProps) => {
        /* console.log(nextProps);
        console.log(this.props); */
    }

    //checks if userName exists first
    returnUser = () => {
        if(this.props.selectedEvent.selectedEvent.createdby){
            return this.props.selectedEvent.selectedEvent.createdby.userName;
        }
        else {
            return "nothing";
        }
    }

    returnComments = () => {

        if(this.props.selectedEvent.selectedEvent.eventComments){
            //console.log(this.props.selectedEvent.selectedEvent.eventComments);
            return this.props.selectedEvent.selectedEvent.eventComments.map(comment => {
                
                return <EventComment 
                            key={comment._id}
                            userComment = {comment.comment}
                            userName ={comment.userName}
                        />
            });
        }
        else {
            return "there is nothing here";
        }
    }

    //calls api to 
    onSubmit = (e) => {
        //e.preventDefault();

        // '/api/events/:id/comment'

        const eventID = this.props.match.params.id;
        const comment = this.state.comment;
        const commentCreatedBy = this.props.selectedEvent.selectedEvent.createdby._id;
        const userName = this.props.auth.userInfo.name;

        const commentInfo = {
            eventID: eventID,
            comment: comment,
            commentCreatedBy: commentCreatedBy,
            userName: userName
        }
        
        this.props.addComment(commentInfo);
    }

    handleInputChanges = (e) => {
        this.setState({[e.target.name]: e.target.value});
        //console.log(e.target.value);
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
                        <h4 className="title is-4">Created By</h4>
                        <p className="is-marginless">{this.returnUser()}</p>
                    </div>
                </div>
                <hr />

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

                        <div className="container">
                            <div className="content">
                                <div className="control">
                                    <textarea className="textarea" name="comment" placeholder="Add a comment here" value={this.state.comment} onChange={this.handleInputChanges}></textarea>
                                </div>
                                <br />
                                <div className="field is-grouped is-grouped-right">
                                    <div className="control">
                                        <button className="button is-link" onClick={this.onSubmit}>Comment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />

                        <div className="container">
                            {
                                this.returnComments()
                                /* this.props.selectedEvent.selectedEvent.eventComments.map(comment => {
                                    
                                }) */
                                //console.log(this.props.selectedEvent.selectedEvent)
                            }

                        </div>

                    </div>
                </div>
                <br /> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedEvent: state.selectedEvent,
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, {
    getCurrentEvent: getCurrentEvent,
    removeCurrentEvent: removeCurrentEvent,
    addComment: addComment
})(EventDescription));