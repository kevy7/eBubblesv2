import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserHero from './subComponents/UserHero';
import EventsNavigation from './subComponents/eventsNavigation';
import { getUsers } from '../actions';

//testing
import UserCard from './subComponents/userCard';
import DisplayUsers from './subComponents/displayUsers';

class Users extends Component {

    componentWillMount = () => {

        //this.props.getUsers();

    }

    render(){
        return (
            <div className="users">
                <UserHero />
                <EventsNavigation />
                <div className="container is-mobile">
                    <hr />
                    {/*
                        Create a displayUsers component here
                    */}
                    <DisplayUsers />
                    

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default withRouter(connect(mapStateToProps, {
    getUsers: getUsers
})(Users));