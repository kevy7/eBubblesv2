import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { getCurrentEvent } from '../actions';
import { removeCurrentEvent } from '../actions';
import { addComment } from '../actions';
import { logUserToEvent } from '../actions';
import { removeUserFromEvent } from '../actions';

import EventHero from './subComponents/eventHero';
import EventComment from './subComponents/eventComment';
import ProgressBar from './subComponents/progressBar';
import Participants from './subComponents/participants';
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

    componentDidMount = () => {
        //This does not currently work so far
        const dropButtons = document.querySelectorAll(".dropButton");

        /* for (var i =0; i < dropButtons.length; i++){
            dropButtons[i].addEventListener("click", function(){
                this.classList.toggle("is-active");
            })
        } */
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
                            commentID = {comment._id}
                            eventID = {this.props.match.params.id}
                            userID={comment.commentCreatedBy}
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
        const eventID = this.props.match.params.id;
        const comment = this.state.comment;
        const commentCreatedBy = this.props.auth.userInfo.id;
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

    //submit a comment via an api call with axios
    onEnterKeyPress = (target) => {
        if(target.charCode==13){
            //alert("you pressed the enter button");
            target.preventDefault();

            const commentInfo = {
                eventID: this.props.match.params.id,
                comment: this.state.comment,
                commentCreatedBy: this.props.auth.userInfo.id,
                userName: this.props.auth.userInfo.name
            }
            
            this.props.addComment(commentInfo);

            //this.commentInput.value = "";
        } 
    }

    joinEvent = (e) => {
        e.preventDefault();

        //We have to create an action first. I don't think a reducer is needed yet

        const logInfo = {
            userId: this.props.auth.userInfo.id,
            eventID: this.props.match.params.id
        }

        this.props.logUserToEvent(logInfo);
    }

    unJoinEvent = (e) => {
        e.preventDefault();

        const logInfo = {
            userID: this.props.auth.userInfo.id, //This is the currently logged in user
            eventID: this.props.match.params.id
        }

        this.props.removeUserFromEvent(logInfo);

        //Pretty much, we're trying to remove the currently logged in user from the events array of listOfParticipants
    }

    render(){
        let url = "/events/" + this.props.selectedEvent.selectedEvent._id + "/edit";

        //WORK ON THIS CODE RIGHT HERE!!!!!
        //Maybe this code should only be activated when there is a new incoming prop
        let joinButton;
        let editButton;

        if(this.props.selectedEvent.selectedEvent.eventParticipants){
            //console.log("There is a list of participants")
            const listOfParticipants = this.props.selectedEvent.selectedEvent.eventParticipants;
            //console.log(listOfParticipants);

            if(listOfParticipants.includes(this.props.auth.userInfo.id)){
                //If there is a match, that means that the user is currently participating in this event
                joinButton = <li><a onClick={this.unJoinEvent} href="#">Unjoin Event</a></li>
            }
            else {
                joinButton = <li><a onClick={this.joinEvent} href="#">Join Event</a></li>
            }
        }

        if(this.props.selectedEvent.selectedEvent.createdby){
            //this.props.auth.userInfo.id
            if(this.props.selectedEvent.selectedEvent.createdby._id === this.props.auth.userInfo.id){
                editButton = <li><Link to={url}>Edit</Link></li>;
            }
            
        }



        if(this.props.selectedEvent.loading == true){
            return <ProgressBar />
        }


        return(
            <div className="eventDescription">

                <nav className="breadcrumb is-right has-dot-separator" id="eventNav" aria-label="breadcrumbs">
                    <ul>
                        {editButton}
                        {/* Only show the edit button below when the user is currently not a particpant of the event */}
                        {joinButton}
                    </ul>
                </nav>

                <div className="is-mobile titleNavBar">
                    <h1 className="title eventTitle has-text-centered">
                        {this.props.selectedEvent.selectedEvent.eventName}
                    </h1>
                </div>

                <EventHero />
                <br />



                {/* we should probably wrap these elements within a div component  */}
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
                        <h4 className="title -s-4">Participants</h4>
                        {/* Place participants element in here  */}

                    </div>
                </div>
                <hr />



                {/* container for comments  */}

                <div className="container">
                    <div className="content">
                        <h4 className="title -s-4">Comments</h4>

                        <div className="container">
                            <div className="content">
                                <div className="control">
                                    <textarea 
                                        className="textarea" 
                                        name="comment" 
                                        placeholder="Add a comment here" 
                                        value={this.state.comment} 
                                        onChange={this.handleInputChanges}
                                        onKeyPress={this.onEnterKeyPress}
                                        ref = {(el) => { this.commentInput = el; }}
                                        >
                                    </textarea>
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

                        <br />
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
    addComment: addComment,
    logUserToEvent: logUserToEvent,
    removeUserFromEvent, removeUserFromEvent
})(EventDescription));