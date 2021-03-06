import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import '../../../styles/inputUser.css';
import ContactChip from './contactChip';
import DisplayUserBox from './displayUserBox';
import ContactChipContainer from "./contactChipContainer";

//import actions in here
//Testing to see if push from new computer will work
import { inputUserAction } from "../../../actions";
import displayUserBox from './displayUserBox';

class inputUser extends Component {

    state = {
        inputUser: ""
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
                    {/* <ContactChip /> */}
                    
                    <ContactChipContainer />
                    
                    <input 
                        className="inputUserField" 
                        value={this.state.inputUser} 
                        name="inputUser" 
                        type="text" 
                        onChange={this.handleInputChanges} 

                    /> {/* As something get's type, search for a user */}
                </div>

                <DisplayUserBox />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userProfileInfo: state.userProfileInfo
    }
}

export default withRouter(connect(mapStateToProps, {
    inputUserAction: inputUserAction
})(inputUser));