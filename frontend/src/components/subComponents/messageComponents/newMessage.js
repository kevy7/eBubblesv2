import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import MessageBox from './messageBox';
import InputMessage from './inputMessage';
import InputFirstMessage from "./inputFirstMessage";
import InputUser from './inputUser';

import "../../../styles/messageBox.css";

class newMessage extends Component {
    render(){
        return (
            <div className="newMessage">
                
                <InputUser />
            
                <MessageBox />

                {/* <InputMessage /> */}
                <InputFirstMessage />

            </div>
        )
    }
}

export default withRouter(newMessage);