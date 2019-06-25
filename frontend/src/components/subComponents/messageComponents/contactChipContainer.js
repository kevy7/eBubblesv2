import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

class contactChipContainer extends Component {

    render(){
        return (
            <div className="contactChipContainer">



            </div>
        )
    }

}

const mapStateToProps = (state) => {
    
}

export default withRouter(connect()(contactChipContainer));