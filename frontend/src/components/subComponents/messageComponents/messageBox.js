import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import MessageCard from './messageCard';
import UserMessageCard from './userMessageCard';

class messageBox extends Component {
    render(){
        return (
            <div className="displayMessageBox">
                
                {/* Let's display messageCard's here */}
                <MessageCard />
                <UserMessageCard />



            </div>
        )
    }
}

export default messageBox;