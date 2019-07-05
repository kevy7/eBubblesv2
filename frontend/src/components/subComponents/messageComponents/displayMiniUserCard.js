import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import MiniUserCard from "./miniUserCard";
import { getUserProfile } from "../../../actions"
import { getConversations } from "../../../actions";




class displayMiniUserCard extends Component {
    //this.auth.userInfo.id this will give us the logged in user's id
    componentWillMount = () => {

        let convoData = {
            authUserID: this.props.auth.userInfo.id
        }

        this.props.getUserProfile(this.props.auth.userInfo.id);
        this.props.getConversations(convoData);
        

    }


    render(){

        //console.log(this.props.userProfileInfo.connections);
        /* const connections = this.props.userProfileInfo.connections || [];

        let users = connections.map((user) => {
            return <MiniUserCard 
                        userName={user.userName}
                        userID={user._id}
                        key={user._id}
                    />
        }) */
        //Above code is essentially getting replaced

        let conversations = this.props.conversations.conversations || [];

        /*
            Think about how you're going to display each conversation

        */

        let mapConversations = conversations.map((convo) => {
            return <MiniUserCard
                        convoName="convoName"
                        key={convo._id}
                        convoID = {convo._id}
                    />
        })

        
        return (
            <div className="displayMiniUserCard">
                {/* display list of messages here */}
                

                {/* Create a loop to loop through each user */}
                {/* users */}
                {mapConversations}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        userProfileInfo: state.userProfileInfo.userProfileInfo,
        conversations: state.conversations
    }
}

export default withRouter(connect(mapStateToProps, {
    getUserProfile: getUserProfile,
    getConversations: getConversations
})(displayMiniUserCard));