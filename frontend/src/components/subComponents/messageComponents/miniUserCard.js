import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import "../../../styles/miniUserCard.css";

class miniUserCard extends Component {

    render(){
        return (
            <div className="miniUserCard">
                <div className="holder">
                    <div className="">
                        <figure className="image is-64x64">
                            <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                        </figure>
                    </div>
                    <div className="holderUserName">
                        <p>poop</p>
                        <small>message here</small>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default miniUserCard;