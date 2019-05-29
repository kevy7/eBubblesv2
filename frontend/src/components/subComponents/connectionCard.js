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

        this.props.addConnection(userData); //this will add user to connections


    }

    rejectButton = (e) => {
        e.preventDefault();

        //console.log("You clicke on the reject button");

        const userData = {
            selectedUserID: this.props.userID,
            authID: this.props.authID,
            selectedUserName: this.props.userName
        }

        this.props.removeUserConnection(userData);
    }

    render(){

        let displayButtons;

        if(this.props.type === "requests"){
            //Not sure if this is the most efficient way of doing it but it works!!!
            displayButtons = (
                <div className="field is-grouped is-grouped-right">
                    <div className="buttons">
                        <button className="button is-warning" onClick={this.rejectButton} >Reject</button>
                        <button className="button is-info" onClick={this.acceptButton} >Accept</button>
                    </div>
                </div>
            );
        }
        else {
            displayButtons = (
                <span></span>
            )
        }

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

                    {/* only display this is this.props.type === "requests" */}
                    {/* <div className="field is-grouped is-grouped-right">
                        <div className="buttons">
                        <button className="button is-warning" onClick={this.rejectButton} >Reject</button>
                        <button className="button is-info" onClick={this.acceptButton} >Accept</button>
                        </div>
                    </div> */}
                    {displayButtons}



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