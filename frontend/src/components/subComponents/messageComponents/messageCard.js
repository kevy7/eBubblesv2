import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import "../../../styles/messageCard.css";

//import MiniUserCard from "./miniUserCard";

class messageCard extends Component {
    
    render(){
        return (
            <div className="messageCard">
                {/* This is meant to display a user's message */}
                <article className="media">
                    <figure className="media-left">
                        <p className="is-64x64" id="userImageMessageCard"> {/* <--- removed "image is-64x64" from className */}
                        <img src="https://bulma.io/images/placeholders/128x128.png" />
                        </p>
                    </figure>
                    <div className="media-content box">
                        <div className="content">
                            <p className="userMessage">
                                <strong>{this.props.senderName}</strong>
                                <br />
                                {this.props.message}
                            </p>
                        </div>
                        
                    </div>
                </article>
                <br />
            </div>
        )
    }
}

export default withRouter(messageCard);