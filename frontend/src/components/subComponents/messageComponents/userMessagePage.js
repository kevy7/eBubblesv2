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

                {/* instead of having the same InputMessage component from the new message page
                    we should create another InputMessage component but for conversations that already exist
                */}

            </div>
        )
    }
}

export default userMessagePage;