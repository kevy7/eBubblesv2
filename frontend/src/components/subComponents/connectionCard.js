import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeUserConnection } from '../../actions';
import { addConnection } from '../../actions';

class connectionCard extends Component {

    acceptButton = (e) => {
        e.preventDefault();

        //userdata should contain these two items
        //selectedUserID
        //authID

        let url;

        const userData = {
            selectedUserID: this.props.userID,
            authID: this.props.authID,
            selectedUserName: this.props.userName
        }

        this.props.removeUserConnection(userData);
        //now we need to call this.props to addConnection
        this.props.addConnection(userData); //this will add user to connections






        //need to make a whole new backend route, with a whole new action as well and need to return back the user
        //console.log("You clicked on the accept button");

        //delete request to delete user from connection request
        //post request to place user into connections instead of connectionRequests

    }

    rejectButton = (e) => {
        e.preventDefault();

        console.log("You clicke on the reject button");
    }

    render(){
        return (
            <div className="connectionCard">
                <div className="box">
                        <div className="columns">
                            <div className="column is-one-fifth">
                                <figure className="image is-128x128">
                                    
                                    <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                    
                                </figure>
                            </div>
                            <div className="column">
                                <p className="title is-4">{this.props.firstName} {this.props.lastName}</p>
                                <p className="subtitle is-6">{this.props.userName}</p>
                                <p>
                                    Sent you a connection request
                                </p>
                            </div>
                        </div>
                    <div className="field is-grouped is-grouped-right">
                        <div className="buttons">
                        <button className="button is-warning" onClick={this.rejectButton} >Reject</button>
                        <button className="button is-info" onClick={this.acceptButton} >Accept</button>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {
    removeUserConnection: removeUserConnection,
    addConnection: addConnection
})(connectionCard);