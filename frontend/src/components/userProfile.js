import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import ProfileBackground from './subComponents/profileBackground';
//import EventsNavigation from './subComponents/eventsNavigation';
import ProfileNavitation from './subComponents/profileNavigation';
import UserActivity from './subComponents/userActivity';

import { getUserLogs } from '../actions';
import { getUserProfile } from '../actions';

import "../styles/userProfile.css";

class userProfile extends Component {

    componentWillMount = () => {

        const logInfo = {
            userID: this.props.match.params.id
        }

        this.props.getUserLogs(logInfo);
        this.props.getUserProfile(this.props.match.params.id);

        //this.props.history.push('/');
        /*
            So it seems like I can add authorization in here
        */
    }

    render(){
        /* const divStyle = {
            color: 'blue',
            background: 'url(' + this.props.selectedEvent.selectedEvent.eventImage + ')'
        }; */

        //this.props.userLogs.userLogs.

        

        return (
            <div className="userProfile">

                <ProfileBackground bgImage="https://images.unsplash.com/photo-1536365480814-1072b4655d02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />

                <ProfileNavitation />
                <div className="section">
                    <div className="container userProfileContainer">
                        <div className="columns">
                            <div className="column is-3">
                                <div className="box is-two-fifths">
                                    <p>
                                        Username: {this.props.userProfileInfo.userProfileInfo.userName}
                                    </p>
                                    <p>
                                        Name: {this.props.userProfileInfo.userProfileInfo.lastName}, {this.props.userProfileInfo.userProfileInfo.firstName}
                                    </p>
                                </div>
                            </div>

                            <div className="column level">
                                
                                <input className="input is-rounded searchBox" type="text" placeholder="Search in the user's feed..."></input>
                                
                                <hr />

                                <div className="">
                                    {
                                        this.props.userLogs.userLogs.map(log => {
                                            return <UserActivity
                                                log={log.log}
                                                date={log.timeStamp}
                                                img={log.event.eventImage}
                                                key={log._id}
                                                eventID={log.event._id}
                                            />

                                        })

                                    }


                                </div>

                            </div>

                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLogs: state.userLogs,
        userProfileInfo: state.userProfileInfo
    }
}

export default withRouter(connect(mapStateToProps, 
    {
        getUserLogs: getUserLogs,
        getUserProfile: getUserProfile
    }
)(userProfile));