import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import MessageBox from './messageBox';
import InputMessage from './inputMessage';
import "../../../styles/userMessagePage.css";



class userMessagePage extends Component {

    render(){
        return (
            <div className="userMessagePage">
                <MessageBox />
                <InputMessage />

            </div>
        )
    }
}

export default userMessagePage;