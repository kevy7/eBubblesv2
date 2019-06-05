import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class newMessage extends Component {
    render(){
        return (
            <div className="newMessage">
                <p>New Message UI will be displayed here</p>
            </div>
        )
    }
}

export default withRouter(newMessage);