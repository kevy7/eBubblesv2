import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux'; //This is probaby not needed

import '../../styles/userCard.css';

class userCard extends Component {

    //this.props.userID wil give us the user's id

    render() {

        let url;

        if(this.props.userID){
            url = "/user/" + this.props.userID;
        }


        return (
            <div className="userCard column is-one-quarter">

                <div className="box">
                {/* just need to style the figure

                 */}
                    <figure className="image is-128x128 usersCard">
                        <Link to={url}>
                            <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                        </Link>
                    </figure>
                    <hr />
                    <p className="has-text-centered">
                        {this.props.firstName} {this.props.lastName}
                    </p>
                    <small>
                        <Link to={url}>
                            <p className="has-text-centered">
                                {this.props.userName}
                            </p>
                        </Link>
                    </small>
                </div>

            </div>
        )
    }
}

export default userCard;