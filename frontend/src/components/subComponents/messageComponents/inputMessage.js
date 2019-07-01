/***************

Component Responsible for inputting messages

***************/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import "../../../styles/inputMessage.css";



class inputMessage extends Component {

    state = {
        userMessage: ""
    }

    handleInputChanges = async (e) => {
        //e.preventDefault();

        await this.setState({[e.target.name]: e.target.value});
        //console.log(this.state.userMessage)
    }

    sendMessage = async (e) => {
        e.preventDefault();

        //Send message to users

        //Create a conversation if no conversation currently exists for these users
        //action that will 


        //If a conversation does exist for these users, then the send button shouldn't be creating another conversation



    }


    render(){
        return (
            <div className="inputMessage">
                {/* Add a text area here */}
                <div className="columns">
                    <div className="column is-11">

                        <textarea 
                            name="userMessage" 
                            className="textarea" 
                            placeholder="You're too awesome...." 
                            row="1"
                            onChange={this.handleInputChanges}
                        ></textarea>

                    </div>
                    <div className="column enterCommentBtn">
                        <a className="button is-info">Send</a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectUsersReducers: state.selectUsersReducers
    }
}

export default withRouter(connect(mapStateToProps, {

})(inputMessage));