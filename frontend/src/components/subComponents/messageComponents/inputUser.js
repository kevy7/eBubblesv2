import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import '../../../styles/inputUser.css';
import ContactChip from './contactChip';
import DisplayUserBox from './displayUserBox';

//import actions in here
import { inputUserAction } from "../../../actions";

class inputUser extends Component {

    state = {
        inputUser: "",
        displayUser: []
    }

    handleInputChanges = async (e) =>{

        await this.setState({[e.target.name]: e.target.value});

        let displayUser = []; //it looks like this array will keep expanding
        let connections = this.props.userProfileInfo.userProfileInfo.connections || [];

        connections.forEach(user => {
            //when the searchUser matches the name of the current user, then push this user into the displayUser array
            //.toLowerCase() to turn a string into a lower case character so that you can search for it
            let userName = user.userName.toLowerCase();

            if(userName.includes(this.state.inputUser.toLowerCase()) == true){
                //The user's input string matches this user's username, push this into the array

                displayUser.push(user);
                
            }
        });

        this.props.inputUserAction(displayUser); //Call action to place searched user's in our state

        //as text is inputed into this input textbox check to see if displayUserBox component is hidden
        //if it is hidden then display it but only do so if it has the class is-hidden

        const displayUserBoxComponent = document.querySelector(".displayUserBox");

        if(this.state.inputUser !== "" && displayUser.length !== 0){
            displayUserBoxComponent.classList.remove("is-hidden");
        }
        else if (this.state.inputUser === "" || displayUser.length === 0){
            displayUserBoxComponent.classList.add("is-hidden");
            //console.log(this.state.inputUser)
        }
        

    }




    render(){
        return (
            <div className="inputUser field">

                <div className="inputContainer">
                    <span className="to">
                        To:
                    </span>

                    {/* place card selectors in here */}
                    {/* This should probably be it's own component */}
                    <ContactChip />

                    <input 
                        className="inputUserField" 
                        value={this.state.inputUser} 
                        name="inputUser" 
                        type="text" 
                        onChange={this.handleInputChanges} 

                    /> {/* As something get's type, search for a user */}

                    {/* 
                        Whenever inputUserField is active, set DisplayUserBox to active

                        what to do: identify how to manipulate your React Components

                        what I'm trying to accomplish

                        Set displayuserbox as active when the input above is set as active as well
                        When input is not active, then set displayuserbox as hidden and do not show it to the user
                    */}

                    <DisplayUserBox />


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

export default withRouter(connect(mapStateToProps, {
    inputUserAction: inputUserAction
})(inputUser));