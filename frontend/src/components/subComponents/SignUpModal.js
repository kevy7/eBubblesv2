//This is the login modal, this moal display type is automatically hidden
//I just need to add js to display it again whenever the login or some other button is clicked
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

//import actions here
import { registerUserAction } from '../../actions/';
//We don't need to import the getError action because it is already going to be called with the same action above

class SignUpModal extends Component {

    state = {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    closeSignUpModal = () => {
        const signUpModal = document.querySelector(".signUpModal");

        signUpModal.classList.remove("is-active");
    }

    handleInputChanges = (e) => {
        this.setState({[e.target.name]: e.target.value});
        //console.log(this.state);  
    }

    onSubmit = (e) => {
        e.preventDefault(); //Prevents the page from refreshing when the button is clicked

        const userData = {
            //This is req.body
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userName: this.state.userName,
            email: this.state.email,
            password: this.state.password
        }

        //This action will be called and will register the user in for us, if successfull, we will be redirected to the /events page
        this.props.registerUserAction(userData, this.props.history);

        this.closeSignUpModal();

    }


    render(){
        
        return(
            <div className="SignUpModal">
                <div className="modal signUpModal">
                    <div className="modal-background"></div>
                        <div className="modal-content">
                           <form className="loginForm box">

                                <div className="field">
                                    <label className="label">First Name</label>
                                    <div className="control">
                                        <input value={this.state.firstName} className="input" name="firstName" type="text" placeholder="first name here" onChange={this.handleInputChanges} />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Last Name</label>
                                    <div className="control">
                                        <input value={this.state.lastName} className="input" name="lastName" type="text" placeholder="last name here" onChange={this.handleInputChanges} />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">User Name</label>
                                    <div className="control">
                                        <input value={this.state.userName} className="input" name="userName" type="text" placeholder="User Name Here" onChange={this.handleInputChanges}/>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input value={this.state.email} className="input" name="email" type="email" placeholder="email here" onChange={this.handleInputChanges}/>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input value={this.state.password} className="input" name="password" type="password" onChange={this.handleInputChanges}/>
                                    </div>
                                </div>


                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-link" onClick={this.onSubmit}>Submit</button>
                                    </div>
                                    {/*}
                                    <div className="control">
                                        <button className="button is-light" onClick={this.closeSignUpModal}>Cancel</button>
                                    </div>
                                    */}
                                </div>

                           </form>
                        </div>
                    <button className="modal-close is-large" aria-label="close" onClick={this.closeSignUpModal}></button>
                </div>
            </div>
        );
    }
}

//All of the data inside of our redux 'store' will be passed in as an argument called 'state'
const mapStateToProps = (state) => {

    //Gaining access to state information
    return {
        err: state.err, //contains error information
        auth: state.auth //contains logged in user's information
    };

}

//Gaining access to an action will be passed down in here
export default withRouter(connect(mapStateToProps, {
    registerUserAction
})(SignUpModal));

