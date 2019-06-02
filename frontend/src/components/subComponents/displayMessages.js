import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class displayMessages extends Component {
    render(){
        return (
            <div className="displayMessages">
                <p>Will display messages here</p>
            </div>
        )
    }
}

export default displayMessages;