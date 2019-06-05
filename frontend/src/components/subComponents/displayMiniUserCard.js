import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';



class displayMiniUserCard extends Component {
    
    render(){
        console.log("this is being rendered");
        return (
            <div className="displayMiniUserCard">
                <p>Display list of convos here</p>
            </div>
        )
    }
}

export default withRouter(displayMiniUserCard);