import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import MessageCard from './messageCard';
import UserMessageCard from './userMessageCard';
import InputMessage from './inputMessage';

class messageBox extends Component {
    render(){
        return (
            <div className="displayMessageBox">
                
                {/* Let's display messageCard's here */}
                

                <div className="messageContainer">
                    {/* this will display a list of messages */}
                    <p>MessageContainerHere</p>
                    <MessageCard />
                    <MessageCard />
                    <MessageCard />
                    <MessageCard />
                    <MessageCard />
                    <MessageCard />
                    <UserMessageCard />
                </div>

                {/* <InputMessage /> */}




            </div>
        )
    }
}

export default messageBox;