import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//import { strictEqual } from 'assert'; //what is this? I never imported this

import { removeComment } from "../../actions/index";
import { editComment } from "../../actions/index";
//import Axios from 'axios';

class eventComment extends Component {
    state = {
        userComment: ""
    }
    componentDidMount = () => {
        const dropButtons = document.querySelectorAll(".dropButton");

        this.setState({userComment: this.props.userComment})

    }
    componentWillReceiveProps =(nextProps) => {
        /* this.setState({
            userComment: nextProps.userComment
        }) */

    }
    
    //used to delete an event comment
    onSubmit = (e) => {
        //e.preventDefault();
        //console.log(this.props.commentID);
        const commentInfo = {
            commentID: this.props.commentID,
            eventID: this.props.eventID
        }

        if (window.confirm("Are you sure you want to delete this comment?")) {
            this.props.removeComment(commentInfo);  
        } else {
            
        }
    }

    //submit a comment via an api call with axios
    onEnterKeyPress = (target) => {
        if(target.charCode==13){
            //alert('Enter clicked!!!');  
            
            //Axios.post()
            const commentInfo = {
                comment: this.state.userComment,
                eventID: this.props.eventID,
                commentID: this.props.commentID
            }
            
            this.props.editComment(commentInfo);

            this.commentBox.classList.toggle("is-hidden");
            this.commentInput.classList.toggle("is-hidden");
            //console.log(commentInfo.comment);
        } 
    }

    handleInputChanges = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    //used to edit an event comment
    editButton = (e) => {
        this.commentBox.classList.toggle("is-hidden");
        this.commentInput.classList.toggle("is-hidden");
        this.commentInput.focus();
    }

    displayDropDown = (e) => {
        e.preventDefault();

        //Not sure how this callback function works but I should research on this
        this._input.classList.toggle("is-active");
    }

    render(){

        let editButton;

        //console.log(this.props.userID);

        if(this.props.auth.userInfo.id){
            if(this.props.auth.userInfo.id === this.props.userID){
                editButton = (
                    <div className="dropdown is-right dropButton" onClick={this.displayDropDown} ref={(el) => this._input = el}>
                        <div className="dropdown-trigger">
                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2">
                                <span className="icon is-small">
                                    <i className="fas fa-ellipsis-h" aria-hidden="true"></i>
                                </span>
                            </button>
                        </div>


                        <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                            <div className="dropdown-content">
                                <a href="#" className="dropdown-item" onClick={this.editButton}>
                                    Edit
                                </a>
                                <hr className="dropdown-divider" />
                                <a href="#" className="dropdown-item" onClick={this.onSubmit}>
                                    Delete
                                </a>
                            </div>
                        </div>     
                    </div>
                );
            }
        }


        return (
            <div className="eventComment">
                <article className="media">
                    <figure className="media-left">
                        <p className="image is-64x64">
                            {/* Profile image should go in here */}
                            <img src="https://bulma.io/images/placeholders/128x128.png" />
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">

                        {/* this is only displayed when the edit button is clicked */}
                        <textarea 
                            name="userComment" 
                            className="textarea is-hidden" 
                            value={this.state.userComment} 
                            rows="2" 
                            ref = {(el) => { this.commentInput = el; }} 
                            onChange={this.handleInputChanges}
                            onKeyPress={this.onEnterKeyPress}
                        />
                        

                        <p className="" ref = {(el) => { this.commentBox = el; }}>
                            <strong>{this.props.userName}</strong> <small>usernamehere</small> <small>days ago this comment was made?</small>
                            <br />
                            {this.props.userComment}
                        </p>



                        </div>
                        <nav className="level is-mobile">
                        <div className="level-left">
                            <a className="level-item">
                            <span className="icon is-small"><i className="fas fa-reply"></i></span>
                            </a>
                            <a className="level-item">
                            <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                            </a>
                            <a className="level-item">
                            <span className="icon is-small"><i className="fas fa-heart"></i></span>
                            </a>
                        </div>
                        </nav>
                    </div>
                    {/* This should only be displayed to the user who created this comment */}

                    {/* This is the dropdown box  */}

                    {editButton}

                    {/*
                    <div className="media-right">

                        <div className="dropdown is-right dropButton" onClick={this.displayDropDown} ref={(el) => this._input = el}>
                            <div className="dropdown-trigger">
                                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2">
                                    <span className="icon is-small">
                                        <i className="fas fa-ellipsis-h" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>


                            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                                <div className="dropdown-content">
                                    <a href="#" className="dropdown-item" onClick={this.editButton}>
                                        Edit
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item" onClick={this.onSubmit}>
                                        Delete
                                    </a>
                                </div>
                            </div>


                        </div>
                        
                    </div>
                    */}


                    {/* <div className="media-right">
                        <button className="delete" onClick={this.onSubmit}></button>
                    </div> */}
                </article>
                <br />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, {
    removeComment: removeComment,
    editComment: editComment
})(eventComment));