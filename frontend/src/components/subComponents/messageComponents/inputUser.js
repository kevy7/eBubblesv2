import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import '../../../styles/inputUser.css';
import ContactChip from './contactChip';

class inputUser extends Component {

    state = {
        inputUser: ""
    }

    handleInputChanges = async (e) =>{
        await this.setState({[e.target.name]: e.target.value});
        //console.log(this.state.inputUser);
    }


    render(){

        let displayUser = [];
        let connections = this.props.userProfileInfo.userProfileInfo.connections || [];
        //console.log(this.props.userProfileInfo.userProfileInfo.connections);

        /* const searchUser = () => {

        } */

        const searchUser = "fake";

        //This may not be needed anymore

        connections.forEach(user => {
            //when the searchUser matches the name of the current user, then push this user into the displayUser array
            //.toLowerCase() to turn a string into a lower case character so that you can search for it

            let userName = user.userName.toLowerCase();

            if(userName.includes(searchUser.toLowerCase()) == true){
                //The user's input string matches this user's username, push this into the array
            }
            else {
                //The user's input string does not match of the these userNames, don't push anything into the array
            }

            //console.log(userName);

        });


        


        //To access list of connections
        //Below will return to us a list of user connections that the selected user has
        //this.props.userProfileInfo.userProfileInfo.connections 





        return (
            <div className="inputUser field">
                {/* <label className="label">Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Input name here" />
                </div> */}

                <div className="inputContainer">
                    <span className="to">
                        To:
                    </span>

                    {/* place card selectors in here */}
                    {/* This should probably be it's own component */}
                    <ContactChip />

                    <input className="inputUserField" value={this.state.inputUser} name="inputUser" type="text" onChange={this.handleInputChanges} /> {/* As something get's type, search for a user */}

                    {/* use is hidden to hide the component below */}
                    <div className="box displayUserBox">
                        <p>Display list of users when typing in the input textbox</p>
                    </div>  
                </div>
            </div>
        )
    }
}

//<input className="input" value={this.state.userName} name="userName" type="text" placeholder="User Name Here" onChange={this.handleInputChanges}/>


 const mapStateToProps = (state) => {
    return {
        userProfileInfo: state.userProfileInfo
    }
}

export default withRouter(connect(mapStateToProps)(inputUser));