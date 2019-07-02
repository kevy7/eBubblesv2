/***************

Component Responsible for inputting the very first message into a newly created conversation

Difference between this component and the inputMessage component?
    -inputMessage component is used to post messages into an existing conversation
    -inputFirstMessage component will be used to post the first message into a newly created conversation that did not exist before


***************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import "../../../styles/inputMessage.css";
import { createConversation } from "../../../actions";



class inputFirstMessage extends Component {

    state = {
        userMessage: ""
    }

    handleInputChanges = async (e) => {
        //e.preventDefault();

        await this.setState({[e.target.name]: e.target.value});
        //console.log(this.state.userMessage)
    }

    sendMessage = async (e) => {
        e.preventDefault();

        //How to redirect users to a different route
        //        this.props.history.push("path/to/push");
        const url = "/messages/user/" + this.props.auth.userInfo.id;


        //this.props.history.push(url);

        //When this button is clicked, a conversation should be returned back to us
        //Once we get the id of the conversation, we need to re-route the user to that conversation and display the current message shown

        const usersArray = [];

        const selectedUsers = this.props.selectUsersReducers.selectedUsers;

        selectedUsers.forEach(user => {
            usersArray.push(user.userID);
            //push each selected users id into the usersArray
        });

        usersArray.push(this.props.auth.userInfo.id); //Push the logged in user to the array as well



        const convoData = {
           authUserID: this.props.auth.userInfo.id,
           users: usersArray,
           message: this.state.userMessage,
           authUserID: this.props.auth.userInfo.id,
           authName: this.props.auth.userInfo.name
        }

        //this.props.createConversation(convoData);
        //in the backend, we have to create the message first before we can push it into our database


    }


    render(){
        return (
            <div className="inputMessage">
                {/* Add a text area here */}
                <div className="columns">
                    <div className="column is-11">

                        <textarea 
                            name="userMessage" 
                            className="textarea" 
                            placeholder="You're too awesome...." 
                            row="1"
                            onChange={this.handleInputChanges}
                        ></textarea>

                    </div>
                    <div className="column enterCommentBtn">
                        <a className="button is-info" onClick={this.sendMessage} >Send</a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectUsersReducers: state.selectUsersReducers,
        auth: state.auth,
        conversations: state.conversations,
        selectedConversation: state.selectedConversation
    }
}

export default withRouter(connect(mapStateToProps, {
    createConversation: createConversation
})(inputFirstMessage));