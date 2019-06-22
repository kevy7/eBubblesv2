import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import "../../../styles/displayUserBox.css";

import UserCard from './userCardUserBox';

//This is considered a container
class displayUserBox extends Component {

    state = {
        selectedUsers: []
    }

    //This box get's displayed whenever the user searches for his connections and trying to see who to message
    render(){
        
        return (
            <div className="box displayUserBox is-hidden">
                {
                    //console.log(searchedUsers);
                    this.props.searchedUsers.map(function(user){
                        return (

                            <UserCard
                                userName={user.userName}
                                userID={user._id}
                                key={user._id}
                                
                                
                            />
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchedUsers: state.inputUserReducer.searchedUsers
    }
}

export default withRouter(connect(mapStateToProps)(displayUserBox));