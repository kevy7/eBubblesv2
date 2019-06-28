import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

//import actions below here
import { removeSelectedUser } from "../../../actions";

class contactChip extends Component {

    onSubmit = (e) => {
        e.preventDefault();


        const userInfo = {
            userID: this.props.userID,
            userName: this.props.userName
        }

        this.props.removeSelectedUser(userInfo);
        
    }

    render(){
        return (
            /* css styling for this component is in inputUser.css */
            <div className="contactChip" onClick={this.onSubmit}>
                {this.props.userName}
                {/* <i className="fas fa-times closeIcon"></i>  */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectUsersReducers: state.selectUsersReducers
    }
}

export default withRouter(connect(mapStateToProps, {
    removeSelectedUser: removeSelectedUser
})(contactChip));