import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "../../../styles/miniUserCard.css";

class miniUserCard extends Component {
    render(){
        //const url = "/user/" + this.props.userID;
        const userMessageUrl = "/messages/user/" + this.props.convoID;
        
        return (
            <div className="miniUserCard">
                <Link to={userMessageUrl}>
                <div className="holder">
                    <div className="">
                        <figure className="image is-64x64">

                            <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                            
                        </figure>
                    </div>
                    <div className="holderUserName">
                        
                        <p>{this.props.userName}</p>
                        
                        <small>Display recent message here</small>
                    </div>
                </div>
                <hr />
                </Link>
            </div>
        )
    }
}

export default miniUserCard;