import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import ContactChip from "./contactChip";
import { getConversations } from "../../../actions";

class contactChipContainer extends Component {

    componentWillReceiveProps = async (nextProps) => {

        //as the selected users change, get a selected conversation based on selected match of users within an array
        if(this.props.selectUsersReducers.selectedUsers !== nextProps.selectUsersReducers.selectedUsers){

            let users = await nextProps.selectUsersReducers.selectedUsers || [];
            let userIDs = [];

            await users.forEach(user => {
                userIDs.push(user.userID);
            })

            userIDs.push(this.props.auth.userInfo.id);

            const convoData = {
                authUserID: this.props.auth.userInfo.id,
                users: userIDs
            }

            await this.props.getConversations(convoData);
        }

    }

    //Create a for loop to display all contact chips based on the users in the selectUsersReducer array

    render(){
        return (
            <div className="contactChipContainer">
                {this.props.selectUsersReducers.selectedUsers.map(user => {
                    return <ContactChip 
                        userName={user.userName}
                        key={user.userID}
                        userID={user.userID}
                    />
                })}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        selectUsersReducers: state.selectUsersReducers,
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, {
    getConversations: getConversations
})(contactChipContainer));