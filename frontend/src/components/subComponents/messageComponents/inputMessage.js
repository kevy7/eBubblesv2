/***************

Component Responsible for inputting messages

***************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import "../../../styles/inputMessage.css";
import { postMessage } from "../../../actions";



class inputMessage extends Component {

    state = {
        userMessage: ""
    }

    handleInputChanges = async (e) => {

        await this.setState({[e.target.name]: e.target.value});
        //console.log(this.state.userMessage)
    }

    sendMessage = async (e) => {
        e.preventDefault();

        const messageData = {
            authUserID: this.props.auth.userInfo.id,
            messageID: this.props.selectedConversation.selectedConversation[0]._id,
            message: this.state.userMessage,
            authName: this.props.auth.userInfo.name
        }

        //if I post a message, it will redirect the user to a new page and we don't want that



        //If a conversation does exist for these users, then the send button shouldn't be creating another conversation
        alert("Alert, you're clicking on a different button");

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
                        <a className="button is-info" onClick={this.sendMessage}>Send</a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectUsersReducers: state.selectUsersReducers,
        selectedConversation: state.selectedConversation,
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, {
    postMessage
})(inputMessage));