/*
    This is your eventbubble component
        -You will need to display an array of these
    these event bubbles will display information about your event

    I'm going to add styles in the jsx elements event though it is not reccomended
*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import "../../styles/eventBubble.css";

class EventBubble extends Component {




    render() {

        if(!this.props.eventID){
            console.log("throw err");
        }
        const url = "/events/" + this.props.eventID

        const displayRemoveButton = () => {
            /*
                if the userid who created the event matches with the id of the currently logged in user, then display the following jsx code below

                <div className="navbar-end eventIcons">
                    <button className="far fa-edit editButton"></button>
                    <button className="delete"></button>
                </div>



                compare this.props.userInfo.id with this.props.userId

                I need to create my backend, where the user who created the event, their id is stored in there
            */
        }

        return (

            
            <div className="eventBubble column is-one-quarter">
                <div className="navbar-end eventIcons">
                    <button className="far fa-edit editButton"></button>
                    <button className="delete"></button>
                </div>
                
                <Link to={url}>
                    <figure className="image" style={{width: "180px", height: "180px", marginLeft: "auto", marginRight: "auto"}}>
                        <img 
                            className="is-rounded" 
                            style={{width: "180px", height: "180px"}}
                            src={this.props.img}
                        />
                        
                        <p className="subtitle is-6 has-text-centered eventTitle" style={{marginTop: "5px"}}>
                            {this.props.eventName}
                        </p>
                    </figure>
                    
                </Link>
                <br />
                



                {/* 
                Not sure if I will need the following code below anymore

                <article className="media">
                    <figure className="media-left">
                        <p className="image is-64x64 level-item">
                            <img src="https://bulma.io/images/placeholders/128x128.png" />
                        </p>
                        
                        <small className="has-text-centered level-item">username Here</small>
                    </figure>

                    
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{this.props.userName}</strong> <small>31 Views</small>
                                <br />
                                random words will go in here
                            </p>  
                        </div>
                    </div>
                </article>
                */}


            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.auth.userInfo
    }
}

export default EventBubble;