import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import "../../../styles/displayUserBox.css";

import UserCard from './userCardUserBox';

//This is considered a container
class displayUserBox extends Component {
    render(){
        
        return (
            <div className="box displayUserBox">
                {
                    //console.log(searchedUsers);
                    this.props.searchedUsers.map(function(user){
                        return (
                            <UserCard
                                userName={user.userName}
                                userID={user._id}
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