import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ConnectionCard from "./connectionCard";
import { getUserProfile } from "../../actions";


class userConnections extends Component {

    //this.props.userProfileInfo.connectionRequests

    componentWillUpdate = (nextProps) => {
        if(this.props.match.params.id !== nextProps.match.params.id){

            alert("woah, url changed");
            
        }
    }



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
                        message="Sent you a connection request"
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
                        message=""
                    />
        })

        //only display connection requests if the current user is logged in
        if(this.props.auth.userInfo.id === this.props.userProfileInfo._id){
            displayUserConn = connectionRequests;
        }
        else {
            displayUserConn = <p>Show nothing</p>
            //displayConnections = <p>Show Nothing here as well</p>
        }

        displayConnections = connectionList; //we want to display this regardless if it's the logged in viewer viewing his/her page or not



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