import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MessageBox from './messageBox';

import "../../../styles/messageBox.css";

class newMessage extends Component {
    render(){
        return (
            <div className="newMessage">
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Input name here" />
                    </div>
                </div>

                <MessageBox />

                {/* MessageBox is only used to display list of messages within a conversation
                    We need to find a way for users to create a conversation and then push their first message within a conversation
                <MessageBox 

                />
                */}

                


            </div>
        )
    }
}

export default withRouter(newMessage);