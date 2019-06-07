import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import MiniUserCard from "./miniUserCard";
import { getUserProfile } from "../../../actions"



class displayMiniUserCard extends Component {
    //this.auth.userInfo.id this will give us the logged in user's id
    componentWillMount = () => {
        const authUserID = this.props.auth.userInfo.id;
        //console.log(authUserID);

        this.props.getUserProfile(authUserID);
    }


    render(){

        //console.log(this.props.userProfileInfo.connections);
        const connections = this.props.userProfileInfo.connections || [];

        let users = connections.map((user) => {
            return <MiniUserCard 
                        userName={user.userName}
                        userID={user._id}
                    />
        })
        
        return (
            <div className="displayMiniUserCard">
                {/* display list of messages here */}
                

                {/* Create a loop to loop through each user */}
                {users}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        userProfileInfo: state.userProfileInfo.userProfileInfo
    }
}

export default withRouter(connect(mapStateToProps, {
    getUserProfile: getUserProfile
})(displayMiniUserCard));