import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

//import MiniUserCard from "./miniUserCard";



class messageCard extends Component {
    
    render(){
        return (
            <div className="messageCard">
                {/* This is meant to display a user's message */}
                <article className="media">
                    <figure className="media-left">
                        <p className="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" />
                        </p>
                    </figure>
                    <div className="media-content box">
                        <div className="content">
                            <p>
                                <strong>Name/UserName here</strong>
                                <br />
                                Message Here: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
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