import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

//import MiniUserCard from "./miniUserCard";



class userMessageCard extends Component {
    
    render(){
        return (
            <div className="userMessageCard">
                {/* This is meant to display a user's message */}
                <article className="media">
                    
                    <div className="media-content box">
                        <div className="content">
                            <p>
                                <strong>{this.props.senderName}</strong>
                                <br />
                                {this.props.message}                            </p>
                        </div>
                        
                    </div>
                    <figure className="media-right">
                        <p className="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" />
                        </p>
                    </figure>
                </article>
            </div>
        )
    }
}

export default withRouter(userMessageCard);