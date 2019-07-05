import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import NewMessage from "./messageComponents/newMessage";
//Maybe create a component to display miniUserCards
import DisplayMiniUserCard from "./messageComponents/displayMiniUserCard";
import UserMessagePage from "./messageComponents/userMessagePage";
import { getConversations } from "../../actions";



import "../../styles/displayMessages.css";

class displayMessages extends Component {
    render(){
        return (
            <div className="displayMessages">
                <div className="columns is-gapless dispMessageColumns">
                    <div className="column is-3 messageColumn">
                        <div className="box messageBox userBox">
                            
                            <div className="messageMenu">
                                <p>List of conversations here</p>
                                <Link to="/messages/new" className="button is-info">New Message</Link>
                            </div>
                            <hr />
                            <DisplayMiniUserCard />
                        </div>
                    </div>
                    <div className="column messageColumn">
                        <div className="box messageBox">
                            
                            <Route exact path="/messages/new" component={NewMessage} />
                            <Route path="/messages/user/:id" component={UserMessagePage} />
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        conversations: state.conversations
    }
}

export default withRouter(connect(mapStateToProps, {
    getConversations: getConversations
})(displayMessages));