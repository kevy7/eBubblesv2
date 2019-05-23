import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserHero from './subComponents/UserHero';
import EventsNavigation from './subComponents/eventsNavigation';
import { getUsers } from '../actions';

class Users extends Component {

    componentWillMount = () => {

        this.props.getUsers();

    }

    render(){
        return (
            <div className="users">
                <UserHero />
                <EventsNavigation />
                <div className="container is-mobile">
                    <hr />
                    

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