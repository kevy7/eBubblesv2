import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import MessageCard from './messageCard';
import UserMessageCard from './userMessageCard';
import InputMessage from './inputMessage';

import { getSelectedConversation } from "../../../actions";

class messageBox extends Component {

    componentWillUpdate = (nextProps) => {
        //console.log(nextProps);

        if(this.props.match.params.id !== nextProps.match.params.id){
            const convoData = {
                authUserID: this.props.auth.userInfo.id,
                messageID: nextProps.match.params.id
            }
            this.props.getSelectedConversation(convoData);
        }

    }

    componentWillMount = () => {
        //this.props.getSelectedConversation

        const convoData = {
            authUserID: this.props.auth.userInfo.id,
            messageID: this.props.match.params.id //This is just the conversation ID
        }

        this.props.getSelectedConversation(convoData);

    }

    render(){
        let messages = ""
        
        return (
            <div className="displayMessageBox">
                
                {/* Let's display messageCard's here */}
                

                <div className="messageContainer">
                    {/* this will display a list of messages */}
                    {/* Only display something if the user actually have messages to display */}
                    <MessageCard />
                    

                    
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
    getSelectedConversation: getSelectedConversation
})(messageBox));