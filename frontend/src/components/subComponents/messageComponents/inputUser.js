import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import '../../../styles/inputUser.css';
import ContactChip from './contactChip';

class inputUser extends Component {

    state = {
        inputUser: "",
        displayUser: []
    }

    handleInputChanges = async (e) =>{
        await this.setState({[e.target.name]: e.target.value});

        let displayUser = [];
        let connections = this.props.userProfileInfo.userProfileInfo.connections || [];
        //console.log(this.state.inputUser);

        /*
            Read this documentation about embedded arrays

            https://stackoverflow.com/questions/11159912/mongodb-query-and-retrieve-objects-inside-embedded-array

        */

        connections.forEach(user => {
            //when the searchUser matches the name of the current user, then push this user into the displayUser array
            //.toLowerCase() to turn a string into a lower case character so that you can search for it

            let userName = user.userName.toLowerCase();

            if(userName.includes(this.state.inputUser.toLowerCase()) == true){
                //The user's input string matches this user's username, push this into the array

                displayUser.push(user);
                
            }
            else {
                //The user's input string does not match of the these userNames, don't push anything into the array
                
            }

            //console.log(userName);

        });

        //use the inputuser action here and pass in the displayUser

        console.log(displayUser);

    }




    render(){
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