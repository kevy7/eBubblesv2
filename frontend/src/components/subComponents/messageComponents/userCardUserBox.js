import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import "../../../styles/userCardUserBox.css";

//import actions in here
import { selectUsers } from "../../../actions";

//convert this from a functional component to a class-based component
class userCardUserBox extends Component {

    onSubmit = (e) => {
        e.preventDefault();

        

        //an action needs to be called here to push this.props.userID into your state
        //We need this as our initialstate

        /*
            selectedUsers: []

            action needs to be called to push/remove a user into the array above (our state)
            but how will the selectedUsers state above reset if we were to refresh our page?
                -I guess a way to resolve this is to create a removeall action, when ever someone redirects to the message page
                    make sure all users in the selectedUsers array are removed

        */

        //this.props.userID will give us the id of the selected user for this component

        const userInfo =  {
            //Push in this object instead
            userID: this.props.userID,
            userName: this.props.userName
        }

        this.props.selectUsers(userInfo);



        //an ajax call needs to be made to get a selectedconversation based on the users in
        //this.props.selectedUsersReducer.selectedUsers
        


    }

    render(){
        return (
            //Whenever the userCardBox component is clicked, we need to initiate an action


            <div className="userCardBox" onClick={this.onSubmit}>
                <div className="userCardImage">
                    <figure className="image is-64x64">

                        <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                    
                    </figure>
                </div>
                
                <div className="userCardName">
                    <p>{this.props.userName}</p>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        selectUsersReducers: state.selectUsersReducers
    }
}

export default withRouter(connect(mapStateToProps, {
    selectUsers: selectUsers
})(userCardUserBox));