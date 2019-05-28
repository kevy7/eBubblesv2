import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ConnectionCard from "./connectionCard";

class userConnections extends Component {

    //this.props.userProfileInfo.connectionRequests

    render(){

        const connectionsReq = this.props.userProfileInfo.connectionRequests || []; //set connections equal to an empty array at first if an array isn't returned
        //console.log(connections);

        const connectionRequests = connectionsReq.map(user => {
            return <ConnectionCard
                        key={user._id}
                        userName={user.userName}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        userID={user._id}
                        authID={this.props.auth.userInfo.id}
                    />
        })

        let displayUserConn;

        //only display connection requests if the current user is logged in
        if(this.props.auth.userInfo.id === this.props.userProfileInfo._id){
            displayUserConn = connectionRequests;
        }
        else {
            displayUserConn = <p>Show nothing</p>
        }

        return (
            <div className="userConnections">
                { displayUserConn /*Display list of connectionRequests - only display this to the user that's currently logged in*/}
                <hr />
                
                
                
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