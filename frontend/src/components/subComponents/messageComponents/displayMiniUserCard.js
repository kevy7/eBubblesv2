import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from "prop-types";

import MiniUserCard from "./miniUserCard";
import { getUserProfile } from "../../../actions"
import { getConversations } from "../../../actions";

class displayMiniUserCard extends Component {
    //this.auth.userInfo.id this will give us the logged in user's id
    componentWillMount = () => {

        let convoData = {
            authUserID: this.props.auth.userInfo.id
        }

        this.props.getUserProfile(this.props.auth.userInfo.id); //This might not be needed anymore
        this.props.getConversations(convoData);
    }

    render(){

        let conversations = this.props.conversations.conversations || [];

        let mapConversations = conversations.map((convo) => {
            let convoNameArray = [];
            let convoName;
            let message;

            convo.users.forEach(user => {
                if(user._id !== this.props.auth.userInfo.id){
                    convoNameArray.push(user.userName); //push each username into the convoName array
                }
            });
            convoName = convoNameArray.join(", ", convoNameArray);
            //This is just a temporary way to display a message in the miniUserCard, should think of a better way
            message = convo.messages[convo.messages.length-1].message;

            return <MiniUserCard
                convoName={convoName}
                key={convo._id}
                convoID = {convo._id}
                message={message}
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