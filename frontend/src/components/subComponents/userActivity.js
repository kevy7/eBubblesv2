/*
    This is just a component for each of the user's activity
*/

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';


import "../../styles/userActivity.css";

class userActivity extends Component {
    render() {

        let eventURL = "/events/" + this.props.eventID;

        if(this.props.img === null){
            return (
                <div className="userActivity">
                    <div className="box">
                        <p>No Log, event was removed </p>
                        <hr />

                        <figure className="image" style={{width: "180px", height: "180px", marginLeft: "auto", marginRight: "auto"}}>
                                <img 
                                    className="is-rounded" 
                                    style={{width: "100%", height: "180px"}}
                                    src="https://images.unsplash.com/photo-1515096788709-a3cf4ce0a4a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                                />
                        </figure>

                    </div>
                </div>
            )
        }


        return (
            <div className="userActivity">

                <div className="box">
                    <Link to={eventURL}>
                        <p className="has-text-centered">
                            {this.props.log}
                        </p>
                    </Link>
                    <p className="has-text-centered">
                        <small>{this.props.date}</small>
                    </p>
                    <hr />

                    <div className="">
                        <Link to={eventURL}>
                            <figure className="image" style={{width: "180px", height: "180px", marginLeft: "auto", marginRight: "auto"}}>
                                <img 
                                    className="is-rounded" 
                                    style={{width: "100%", height: "180px"}}
                                    src={this.props.img}
                                />
                            </figure>
                        </Link>
                    </div>

                </div>
                <br />

            </div>
        )
    }
}

export default userActivity;

