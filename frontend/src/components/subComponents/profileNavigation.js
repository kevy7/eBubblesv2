import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { sendConnection } from '../../actions';



class profileNavigation extends Component {
    //ref = {(el) => { this.commentBox = el; }

    /*
        need to find a more efficient way of doing this
    */

    onSubmit = (e) => {
        e.preventDefault();

        console.log("You pressed on me");
        //this.messageLink.classList.toggle("is-active");

        
    }

    connectWithUser = (e) => {
        e.preventDefault();

        //When this button is clicked, this will send a request to the backend to send a connection request to the user
        // remember, this.props.authUser gives us the id of the user that is currently logged in

        const userIDs = {
            authUser: this.props.authUser,  //use this.props.auth.userInfo.id
            selectedUser: this.props.selectedUser //use this.props.userProfileInfo.userProfileInfo._id
        }

        //this works, connection request sent
        this.props.sendConnection(userIDs);

        //console.log(userIDs);
    }

    render(){

        let displayConnect;
        //if the selectedUser's connectionRequest contains the logged in user's id display "connection sent" else, continue displaying "connect"
        //this.props.userProfileInfo.userProfileInfo.connectionRequests.includes(this.props.auth.userIfno.id

        //console.log(this.props.userProfileInfo.userProfileInfo.connectionRequests)

        let connectionRequests = this.props.userProfileInfo.userProfileInfo.connectionRequests;

        if(connectionRequests){
            //If the array exists, then do something in here

            if(connectionRequests.includes(this.props.auth.userInfo.id)){
                //console.log("Yes, this user is currently sending a connection request")
                //yes, so this currently works
                displayConnect = <li className="is-active" ><a aria-current="page" >Connection Sent</a></li>
            }
            else {
                displayConnect = <li className="" ><a aria-current="page" onClick={this.connectWithUser}>Connect</a></li>
            }
        }
        
        


        if(this.props.authUser === this.props.selectedUser){
            return (
                <div className="profileNavigation" style={{marginBottom: "10px"}}>
                        <nav className="breadcrumb is-medium is-centered has-dot-separator" aria-label="breadcrumbs">
                            <ul>
                                <li className="" onClick={this.onSubmit} ref = {(el) => { this.logsLink = el; }}><Link to={this.props.match.url}>Logs</Link></li>
                                <li ref = {(el) => { this.connectionsLink = el; }}><Link to={this.props.match.url + "/connections"} href="#">Connections</Link></li>
                                <li ref = {(el) => { this.messageLink = el; }}><a href="#" onClick={this.onSubmit}>Messages</a></li>
                                <li className="" ref = {(el) => { this.eventsLink = el; }}><a href="#" aria-current="page">My Events</a></li>
                            </ul>
                        </nav>
                </div>
            )
        }

        return (
            <div className="profileNavigation" style={{marginBottom: "10px"}}>
                        <nav className="breadcrumb is-medium is-centered has-dot-separator" aria-label="breadcrumbs">
                            <ul>
                                <li className="" onClick={this.onSubmit} ref = {(el) => { this.logsLink = el; }}><Link to={this.props.match.url}>Logs</Link></li>
                                <li ref = {(el) => { this.connectionsLink = el; }}><Link to={this.props.match.url + "/connections"} href="#">Connections</Link></li>
                                <li ref = {(el) => { this.messageLink = el; }}><a href="#" onClick={this.onSubmit}>Message Me</a></li>
                                <li className="" ref = {(el) => { this.eventsLink = el; }}><a href="#" aria-current="page">Events</a></li>
                                {displayConnect}
                            </ul>
                        </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userProfileInfo: state.userProfileInfo,
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, {
    sendConnection: sendConnection
})(profileNavigation));