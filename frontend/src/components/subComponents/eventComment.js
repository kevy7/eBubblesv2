import React, { Component } from 'react';
import withRouter from "react-router-dom";
import { connect } from "react-redux";

class eventComment extends Component {
    render(){
        return (
            <div className="eventComment">
                <article className="media">
                    <figure className="media-left">
                        <p className="image is-64x64">
                            {/* Profile image should go in here */}
                            <img src="https://bulma.io/images/placeholders/128x128.png" />
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                        <p>
                            <strong>{this.props.userName}</strong> <small>usernamehere</small> <small>days ago this comment was made?</small>
                            <br />
                            {this.props.userComment}
                        </p>
                        </div>
                        <nav className="level is-mobile">
                        <div className="level-left">
                            <a className="level-item">
                            <span className="icon is-small"><i className="fas fa-reply"></i></span>
                            </a>
                            <a className="level-item">
                            <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                            </a>
                            <a className="level-item">
                            <span className="icon is-small"><i className="fas fa-heart"></i></span>
                            </a>
                        </div>
                        </nav>
                    </div>
                    {/* This should only be displayed to the user who created this comment */}
                    <div className="media-right">
                        <button className="delete"></button>
                    </div>
                </article>
            </div>
        )
    }
}

export default eventComment;