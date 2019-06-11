import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import "../../../styles/miniUserCard.css";

class miniUserCard extends Component {

    render(){
        const url = "/user/" + this.props.userID;
        const userMessageUrl = "/messages/user/" + this.props.userID;
        
        return (
            <div className="miniUserCard">
                <Link to={userMessageUrl}>
                <div className="holder">
                    <div className="">
                        <figure className="image is-64x64">
                            <Link to={url}>
                            <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                            </Link>
                        </figure>
                    </div>
                    <div className="holderUserName">
                        <Link to={url}>
                        <p>{this.props.userName}</p>
                        </Link>
                        <small>message here</small>
                    </div>
                </div>
                <hr />
                </Link>
                
            </div>
        )
    }
}

export default miniUserCard;