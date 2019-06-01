import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserActivity from './userActivity';
import { getUserLogs } from '../../actions';
import { getUserProfile } from '../../actions';

import ProgressBar from './progressBar';


class userLogs extends Component {

    //Is it a bad thing to have a global variable set up here

    componentWillMount = () => {
        const logInfo = {
            userID: this.props.match.params.id
        }

        //console.log(this.props.match.params.id);

        this.props.getUserLogs(logInfo);
        this.props.getUserProfile(this.props.match.params.id);

        
    }

    componentWillUpdate = (nextProps) =>{
        if(nextProps.match.params.id !== this.props.match.params.id){
            const logInfo = {
                userID: nextProps.match.params.id
            }
            this.props.getUserLogs(logInfo);
            this.props.getUserProfile(nextProps.match.params.id);
        }
    }

    render(){

        //console.log(this.props.userLogs)

        if(this.props.userLogs.loading === true){
            return <ProgressBar />
        }

        let userActivity;

        let img;


        const displayActivity = this.props.userLogs.userLogs.map(log => {

            return <UserActivity
                log={log.log}
                date={log.timeStamp}
                img={log.image}
                key={log._id}
                eventID={log.event} //this needs to change
                logType = {log.type}
                userID={log.connectedUser}
            />
        })


        //{log.event.eventImage}

        return (
            <div className="userLogs">
                {
                    /* this.props.userLogs.userLogs.map(log => {
                        return <UserActivity
                            log={log.log}
                            date={log.timeStamp}
                            img={log.event.eventImage}
                            key={log._id}
                            eventID={log.event._id}
                        />
                    }) */
                    displayActivity
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userLogs: state.userLogs,
    }
}

export default withRouter(connect(mapStateToProps, {
    getUserLogs: getUserLogs,
    getUserProfile: getUserProfile
})(userLogs));
