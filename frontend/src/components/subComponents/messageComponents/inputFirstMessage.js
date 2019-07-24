/***************

Component Responsible for inputting the very first message into a newly created conversation

Difference between this component and the inputMessage component?
    -inputMessage component is used to post messages into an existing conversation
    -inputFirstMessage component will be used to post the first message into a newly created conversation that did not exist before

***************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import isEmpty from "is-empty";

import "../../../styles/inputMessage.css";
import { createConversation } from "../../../actions";
import { getConversations } from "../../../actions";

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
        /*
            Issue with this code:

            We cannot create a new conversation if there is already a conversation created for these users
            They should be pushing messages to an already created conversation if it exists

        */
        const usersArray = [];
        const usersNamesArray = [];

        const selectedUsers = this.props.selectUsersReducers.selectedUsers;

        selectedUsers.forEach(user => {
            usersArray.push(user.userID);
            usersNamesArray.push(user.userName);
            //push each selected users id into the usersArray
        });

        usersArray.push(this.props.auth.userInfo.id); //Push the logged in user to the array as well

        //convert usersNamesArray into a string
        const conversationName = usersNamesArray.join(", ");
        
        const convoData = {
           authUserID: this.props.auth.userInfo.id,
           users: usersArray,
           message: this.state.userMessage,
           authUserID: this.props.auth.userInfo.id,
           authName: this.props.auth.userInfo.name,
           conversationName: conversationName
        }

        /*
            What if I do this. Compare the usersArray with this.props.selectedConversation.users
            if both of these array matches and have the same users and amounts, then do not initiate the
            createConversation action, instead initiate a different action called pushMessage

            issue: every time a user is selected for a new conversation, initiate an action that wil return a conversation that contains
            those users in it's conversation.users array

            Find a way in the backend to search for conversations, that exactly matches the list of users given
        */

        await this.props.createConversation(convoData)
        //console.log(this.props.selectedConversation.selectedConversation);

    }

    //Use the react lifecycle method to redirect user to a new page right after a conversation is created
    componentWillReceiveProps = async (nextProps) => {

        //When a new conversation is added to the database, the getConversations action will execute
        if(nextProps.selectedConversation.selectedConversation !== this.props.selectedConversation.selectedConversation){

            const getConvoData = {
                authUserID: this.props.auth.userInfo.id
            }

            if(isEmpty(nextProps.selectedConversation.selectedConversation) === false){
                //if the object above is not empty, then execute the following code here

                let url = "/messages/user/" + nextProps.selectedConversation.selectedConversation._id;

                if(nextProps.selectedConversation.isNewConvo == true){
                    //Only redirect user if this is going to be a new conversation
                    //When a new conversation is created, get a new list of conversations as well
                    this.props.getConversations(getConvoData);
                    nextProps.history.push(url);
                }

            }
            
        }
        
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
    createConversation: createConversation,
    getConversations: getConversations
})(inputFirstMessage));