import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import MessageBox from './messageBox';
import InputMessage from './inputMessage';
import InputUser from './inputUser';

import "../../../styles/messageBox.css";

class newMessage extends Component {
    render(){
        return (
            <div className="newMessage">
                {/* Learn how to create a selectUsre */}

                {/*<div className="inputUser field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Input name here" />
                    </div>
                </div>*/}
                {/* <Route exact path="/messages/:id" component={InputUser} /> */}
                <InputUser />
                


                <MessageBox />

                {/* MessageBox is only used to display list of messages within a conversation
                    We need to find a way for users to create a conversation and then push their first message within a conversation
                <MessageBox 

                />
                */}

                <InputMessage />


            </div>
        )
    }
}

export default withRouter(newMessage);