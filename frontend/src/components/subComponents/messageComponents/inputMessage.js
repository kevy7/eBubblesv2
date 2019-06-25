/***************

Component Responsible for inputting messages

***************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import "../../../styles/inputMessage.css";



class inputMessage extends Component {
    render(){
        return (
            <div className="inputMessage">
                {/* Add a text area here */}
                <div className="columns">
                    <div className="column is-11">
                        <textarea className="textarea" placeholder="You're too awesome...." row="1"></textarea>
                    </div>
                    <div className="column enterCommentBtn">
                        <a className="button is-info">Send</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default inputMessage;