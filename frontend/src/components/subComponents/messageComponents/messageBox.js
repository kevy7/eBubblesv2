import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import isEmpty from "is-empty";

import MessageCard from './messageCard';
import UserMessageCard from './userMessageCard';
//import InputMessage from './inputMessage';

import { getSelectedConversation } from "../../../actions";
import { clearSelectedConvo } from "../../../actions";
import { removeAllSelectedUsers } from "../../../actions";

class messageBox extends Component {

    componentWillUpdate = async (nextProps) => {

        if(this.props.match.params.id !== nextProps.match.params.id){
            const convoData = {
                authUserID: this.props.auth.userInfo.id,
                messageID: nextProps.match.params.id,
                users: ""
            }

            this.props.getSelectedConversation(convoData);
        }
    }

    componentWillMount = async () => {

        const convoData = {
            authUserID: this.props.auth.userInfo.id,
            messageID: this.props.match.params.id, //This is just the conversation ID
            users: ""
        }

        if(this.props.match.path !== "/messages/new"){
            await this.props.getSelectedConversation(convoData);
        }
        else{
            await this.props.clearSelectedConvo();
            await this.props.removeAllSelectedUsers();
        }

    }

    render(){
        let messages = this.props.selectedConversation.selectedConversation[0] || [];
        let newMessages = messages.messages || [];

        let displayMessages = newMessages.map(message => {

            //Create an if statement here
            //if senderName === the auth username then return userMessageCard instead
            //this.props.auth.userInfo.id

            if(this.props.auth.userInfo.id === message.sender){
                return <UserMessageCard 
                    message={message.message}
                    senderName={message.senderName}
                    key={message._id}
                />
            }
            else {
                return <MessageCard
                    message={message.message}
                    senderName={message.senderName}
                    key={message._id}
                />
            }

        })

        return (
            <div className="displayMessageBox">
                <div className="messageContainer">
                    {displayMessages}  
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //messages: state.messages
        selectedConversation: state.selectedConversation,
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, {
    getSelectedConversation: getSelectedConversation,
    clearSelectedConvo: clearSelectedConvo,
    removeAllSelectedUsers: removeAllSelectedUsers
})(messageBox));