import React, {Component} from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'; //our 'App' component has to be wrapped within our browerRouter
import { connect } from 'react-redux';

import ProfileBackground from './subComponents/profileBackground';
//import EventsNavigation from './subComponents/eventsNavigation';
import ProfileNavitation from './subComponents/profileNavigation';
import UserActivity from './subComponents/userActivity';
import UserLogs from './subComponents/userLogs';
import ProgressBar from './subComponents/progressBar';
import UserConnections from './subComponents/userConnections';
import UserBox from './subComponents/userBox';
//import ProgressBar from './subComponents/progressBar';
import DisplayMessages from './subComponents/displayMessages';

import { getUserLogs } from '../actions';
import { getUserProfile } from '../actions';

import "../styles/userProfile.css";

class userProfile extends Component {

    componentWillMount = () => {

        /* const logInfo = {
            userID: this.props.match.params.id
        }

        this.props.getUserProfile(this.props.match.params.id);  */


    }

    componentWillUpdate = (nextProps) =>{
        //console.log(nextProps);
        if(nextProps.match.params.id !== this.props.match.params.id){
            this.props.getUserProfile(nextProps.match.params.id);
        }
    }

    render(){
        

        return (
            <div className="userProfile">
                <ProfileBackground bgImage="https://images.unsplash.com/photo-1536365480814-1072b4655d02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                <div className="section">
                    <div className="container userProfileContainer">
                        <div className="columns">
                            <div className="column is-3">
                                 {/* <div className="box is-two-fifths">
                                    <p>
                                        Username: {this.props.userProfileInfo.userProfileInfo.userName}
                                    </p>
                                    <p>
                                        Name: {this.props.userProfileInfo.userProfileInfo.lastName}, {this.props.userProfileInfo.userProfileInfo.firstName}
                                    </p>
                                </div>  */}
                                <UserBox />
                            </div>

                            <div className="column level">
                                <ProfileNavitation 
                                    authUser = {this.props.auth.userInfo.id}
                                    selectedUser = {this.props.userProfileInfo.userProfileInfo._id}
                                />
                                <input className="input is-rounded searchBox" type="text" placeholder="Search in the user's feed..."></input>
                                <hr />

                                
                                <Route exact path="/user/:id" component={UserLogs} />
                                <Route exact path="/user/:id/connections" component={UserConnections} />
                                <Route exact path="/user/:id/messages" component={DisplayMessages} />


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
        userProfileInfo: state.userProfileInfo,
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, 
    {
        getUserLogs: getUserLogs,
        getUserProfile: getUserProfile
    }
)(userProfile));