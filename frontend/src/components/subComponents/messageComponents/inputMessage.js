/***************

Component Responsible for inputting messages

***************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

class inputMessage extends Component {
    render(){
        return (
            <div className="inputMessage">
                <p>display input message component</p>
            </div>
        )
    }
}

export default inputMessage;