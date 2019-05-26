import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ConnectionCard from "./connectionCard";

class userConnections extends Component {

    //this.props.userProfileInfo.connectionRequests

    render(){

        const connections = this.props.userProfileInfo.connectionRequests || []; //set connections equal to an empty array at first if an array isn't returned
        //console.log(connections);

        const users = connections.map(user => {
            return <ConnectionCard key={user}/>
        })

        return (
            <div className="userConnections">
                {
                    /* this.props.userProfileInfo.connectionRequests.map((user) => {
                        return <ConnectionCard />
                    }) */
                    users
                }
                <hr />
                <p>Here, list of connections will be displayed in here</p>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userProfileInfo: state.userProfileInfo.userProfileInfo
    }
}

export default withRouter(connect(mapStateToProps)(userConnections));