import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getUsers } from '../../actions';
import UserCard from './userCard';



class displayUsers extends Component {

    componentWillMount = () => {
        this.props.getUsers();
    }

    render(){
        return (
            <div className="displayUsers">
                <div className="columns container is-multiline">

                    {
                        this.props.users.users.map(user => {
                            return <UserCard
                                firstName={user.firstName}
                                lastName={user.lastName}
                                userName={user.userName}
                                userID={user._id}
                            />
                        })
                    }


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
})(displayUsers));