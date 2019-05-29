import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ConnectionCard from "./connectionCard";

class userConnections extends Component {

    //this.props.userProfileInfo.connectionRequests

    render(){

        const connectionsReq = this.props.userProfileInfo.connectionRequests || []; //set connections equal to an empty array at first if an array isn't returned
        const connections = this.props.userProfileInfo.connections || [];
        let displayUserConn;
        let displayConnections;

        const connectionRequests = connectionsReq.map(user => {
            return <ConnectionCard
                        key={user._id}
                        userName={user.userName}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        userID={user._id}
                        authID={this.props.auth.userInfo.id}
                        type="requests"
                    />
        })

        const connectionList = connections.map(friend => {
            return <ConnectionCard
                        key={friend._id}
                        userName={friend.userName}
                        firstName={friend.firstName}
                        lastName={friend.lastName}
                        userID={friend._id}
                        authID={this.props.auth.userInfo.id}
                        type="friends"
                    />
        })

        //only display connection requests if the current user is logged in
        if(this.props.auth.userInfo.id === this.props.userProfileInfo._id){
            displayUserConn = connectionRequests;
            displayConnections = connectionList;
        }
        else {
            displayUserConn = <p>Show nothing</p>
            displayConnections = <p>Show Nothing here as well</p>
        }


        







        return (
            <div className="userConnections">
                { displayUserConn /*Display list of connectionRequests - only display this to the user that's currently logged in*/}
                <hr />
                { displayConnections }

                
                
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userProfileInfo: state.userProfileInfo.userProfileInfo,
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(userConnections));