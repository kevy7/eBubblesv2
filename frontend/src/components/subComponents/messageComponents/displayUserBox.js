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
                <UserCard />
            </div>
        )
    }
}

export default displayUserBox;