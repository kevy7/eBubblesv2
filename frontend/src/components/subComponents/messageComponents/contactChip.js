import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

class contactChip extends Component {

    render(){
        return (
            /* css styling for this component is in inputUser.css */
            <div className="contactChip">
                usernamehere
                <i class="fas fa-times closeIcon"></i>  
            </div>
        )
    }
}

export default contactChip;