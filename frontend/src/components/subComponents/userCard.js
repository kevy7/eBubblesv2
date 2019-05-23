import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; //This is probaby not needed

import '../../styles/userCard.css';

class userCard extends Component {

    render() {
        return (
            <div className="userCard column is-one-quarter">


                {/* <div className="card">
                    <div className="card-image">
                        <figure class="image is-128x128">
                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4">John Smith</p>
                                <p className="subtitle is-6">@johnsmith</p>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="box">
                {/* just need to style the figure

                 */}
                    <figure className="image is-128x128 usersCard">
                        <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                    </figure>
                    <hr />
                    <p className="has-text-centered">
                        {this.props.userName}
                    </p>
                    <small>
                        <p className="has-text-centered">
                        {this.props.firstName} {this.props.lastName}
                        </p>
                    </small>
                </div>


            </div>
        )
    }
}

export default userCard;