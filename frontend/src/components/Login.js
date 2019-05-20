//page for your login page
//Everything is going to be rendered into a single html webpage
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
//import jwtDecode from 'jwt-decode';

//importing code from my own personal files will be placed below
import { loginUserAction } from '../actions';

class Login extends Component {

    state = {
        userName: "",
        password: ""
    }

    handleInputChanges = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    }
    
    onSubmit = (e) => {
        e.preventDefault();

        const userLoginData = {
            userName: this.state.userName,
            password: this.state.password
        }

        this.props.loginUser(userLoginData, this.props.history); //user will be signed in via our action, reducer will be pass in new data from our action into our central state
        
    }
    render(){
        return (
            <div className="Login">
                    
                    <div className="container column is-4 is-offset-4">
                        <h1 className="title">Login to Event Bubbles</h1>
                        <form className="loginForm">
                            <div className="field">
                                <label className="label">User Name</label>
                                <div className="control">
                                    <input className="input" value={this.state.userName} name="userName" type="text" placeholder="User Name Here" onChange={this.handleInputChanges}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input className="input is-half" value={this.state.password} name="password" type="password" placeholder="" onChange={this.handleInputChanges}/>
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-link" onClick={this.onSubmit}>Submit</button>
                                </div>
                            </div>
                        </form>

                        <br />
                        <p>Log in with the following information to demo the app</p>
                        <br />
                        <p>User Name: fakeUser</p>
                        <p>Password: welcome1</p>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        auth: state.auth,
        err: state.err
    }
}

export default withRouter(connect(mapStateToProps, {
    loginUser: loginUserAction
})(Login));