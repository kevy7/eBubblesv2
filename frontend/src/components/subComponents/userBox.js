import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserProfile } from '../../actions';
import ProgressBar from './progressBar';

class userBox extends Component {

    componentWillMount = () => {
        const logInfo = {
            userID: this.props.match.params.id
        }

        //console.log(this.props.match.params.id)

        this.props.getUserProfile(this.props.match.params.id);
    }

    render(){
        if(this.props.userProfileInfo.loading){
            return <ProgressBar />
        }
        return (
            <div className="userBox">
                <div className="box is-two-fifths">
                    <p>
                        Username: {this.props.userProfileInfo.userProfileInfo.userName}
                    </p>
                    <p>
                        Name: {this.props.userProfileInfo.userProfileInfo.lastName}, {this.props.userProfileInfo.userProfileInfo.firstName}
                    </p>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userProfileInfo: state.userProfileInfo,

    }
}

export default withRouter(connect(mapStateToProps, {
    getUserProfile: getUserProfile
})(userBox));
