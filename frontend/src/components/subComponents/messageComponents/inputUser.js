import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import '../../../styles/inputUser.css';
import ContactChip from './contactChip';

class inputUser extends Component {

    state = {
        inputUser: ""
    }

    handleInputChanges = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }


    render(){

        let displayUser = [];
        let connections = this.props.userProfileInfo.userProfileInfo.connections || [];

        


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


mapStateToProps = (state) => {
    return {
        userProfileInfo: state.userProfileInfo
    }
}

export default withRouter(connect()(inputUser));