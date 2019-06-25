import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import ContactChip from "./contactChip";

class contactChipContainer extends Component {

    //Create a for loop to display all contact chips based on the users in the selectUsersReducer array

    render(){
        return (
            <div className="contactChipContainer">



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

})(contactChipContainer));