import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import isEmpty from "is-empty";

import MessageCard from './messageCard';
import UserMessageCard from './userMessageCard';
import InputMessage from './inputMessage';

import { getSelectedConversation } from "../../../actions";
import { clearSelectedConvo } from "../../../actions";

class messageBox extends Component {

    componentWillUpdate = async (nextProps) => {
        if(this.props.match.params.id !== nextProps.match.params.id){
            const convoData = {
                authUserID: this.props.auth.userInfo.id,
                messageID: nextProps.match.params.id
            }
            this.props.getSelectedConversation(convoData);
            //this.props.clearSelectedConvo();
            
        }
        else if (isEmpty(nextProps.selectedConversation.selectedConversation.length) !== true){
            await console.log("this object does not return empty");
            //Since the object is not empty, redirect the user to a new route
        }

    }

    componentWillMount = async () => {
        //this.props.getSelectedConversation

        const convoData = {
            authUserID: this.props.auth.userInfo.id,
            messageID: this.props.match.params.id //This is just the conversation ID
        }

        if(this.props.match.path !== "/messages/new"){
            await this.props.getSelectedConversation(convoData);
        }
        else{
            await this.props.clearSelectedConvo();
            //console.log(await this.props.selectedConversation.selectedConversation);
        }
        
        //this.props.getSelectedConversation(convoData);

    }

    render(){
        let messages = this.props.selectedConversation.selectedConversation[0] || [];
        let newMessages = messages.messages || [];

        let displayMessages = newMessages.map(message => {
            return <MessageCard 
                        message={message.message}
                        senderName="name1"
                        key={message._id}
                    />
        })

        return (
            <div className="displayMessageBox">
                
                {/* Let's display messageCard's here */}
                

                <div className="messageContainer">
                    {/* this will display a list of messages */}
                    {/* Only display something if the user actually have messages to display */}
                    
                    {displayMessages}
                    

                    
                </div>

                {/* <InputMessage /> */}

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
    clearSelectedConvo: clearSelectedConvo
})(messageBox));