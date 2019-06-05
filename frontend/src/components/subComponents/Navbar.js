import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//import { connect } from 'react-redux'; //This is used so that we can connect to data from the provider
import SignUpModal from './SignUpModal';
import authenticate from '../../services/authenticate'; //this function will check whether the user is authenticated or not
import { logoutUser } from '../../actions';//action used to logout the user
import { getEvents } from '../../actions';

//I think I need to import link from react-route so that the thumbnail will take the user to the homepage of my website

class Navbar extends Component {

    displaySignUpModal = () => {

        //This will activate when the signUp button is 'onClick'

        //This function is meant to display your modal

        //Select the signUpModal
        const signUpModal = document.querySelector(".signUpModal");

        //adding 'is-active' as a class name will display the hidden modal
        signUpModal.classList.add("is-active");


    }

    logOutUser = (e) => {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }


    /*
        Find a way to display the login button for people who are not authneticated and display the logout button for people who are authenticated
    */
    loutOrLinButton = (props) => {
        //this function will return either the login our signout button based on if the user is authenticated or not

        //this.props.auth.isAutheticated will return true or false based on if the user is logged in or not

        

        if (this.props.auth.isAuthenticated === false){
            return (
                <Link to="/login" className="button is-light">
                    Log in
                </Link>
            );
        }

        else {
            return (
                <a className="button is-info" onClick={this.logOutUser}>
                    <strong>Log Out</strong>
                </a>
            );
        }
    }

    render(){

        let url = "/user/" + this.props.auth.userInfo.id;
        let userNavItem;

        //authenticate the user first

        if(this.props.auth.isAuthenticated === true){
            userNavItem = (
                <Link to={url} className="navbar-item">
                    {this.props.auth.userInfo.name}
                </Link>
            )
        }
        
        

        return(
            <div className="mainNav">
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Link to="/" className="navbar-item">
                            Event Bubbles
                        </Link>
                        {userNavItem}

                        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    More
                                </a>

                            <div className="navbar-dropdown">
                                <a className="navbar-item">
                                    Requests
                                </a>
                                <Link className="navbar-item" to="/events">
                                    Events
                                </Link>
                                <Link to="/events/new" className="navbar-item">
                                    New Event
                                </Link>
                                <hr className="navbar-divider" />
                                <Link to={url} className="navbar-item">
                                    My Profile
                                </Link>
                                <Link to="/messages" className="navbar-item">
                                    Messages
                                </Link>
                                <a className="navbar-item">
                                    About
                                </a>
                            </div>
                        </div>
                    </div>

                        <div className="navbar-menu navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a className="button is-info" onClick={this.displaySignUpModal}>
                                        <strong>Sign up</strong>
                                    </a>
                                    {this.loutOrLinButton()}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>


                <SignUpModal />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth, 
        events: state.events
    }
}

export default withRouter(connect(mapStateToProps, {
    logoutUser: logoutUser,
    getEvents: getEvents
})(Navbar));
