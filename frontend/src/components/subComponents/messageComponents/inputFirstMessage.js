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

        await this.props.createConversation(convoData);
        
    }

    //Use the react lifecycle method to redirect user to a new page right after a conversation is created
    componentWillReceiveProps = (nextProps) => {
        /* console.log(nextProps.selectedConversation);
        console.log(this.props.selectedConversation); */

        if(nextProps.selectedConversation.selectedConversation !== this.props.selectedConversation.selectedConversation){
            //console.log(nextProps.selectedConversation.selectedConversation._id);

            //Once the selectedConversation id is retrieved, we'll redirect the user to a new url
            let url = "/messages/user/" + nextProps.selectedConversation.selectedConversation._id;
            this.props.history.push(url);
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
    createConversation: createConversation
})(inputFirstMessage));