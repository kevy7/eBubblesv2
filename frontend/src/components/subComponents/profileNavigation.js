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

    componentWillUpdate = (nextProps) => {
        
    }

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

    disconnectWithUser = (e) => {
        e.preventDefault();

        alert("Will add code to this button later");
    }

    render(){

        //Work on this
        let displayConnect;// = <li className="" > <a aria-current="page" onClick={this.connectWithUser}>Connect</a> </li>;
        let word;

        let connectionRequests = this.props.userProfileInfo.userProfileInfo.connectionRequests || [];
        let connections = this.props.userProfileInfo.userProfileInfo.connections || [];


            //This is another way of creating a forEach loop
            //displayConnect = <li className="" > <a aria-current="page" onClick={this.connectWithUser}>Connect</a> </li>;
            //console.log(connections);
            //console.log(connectionRequests);

        //
        if(connectionRequests.length !== 0){
            //console.log("connectionRequests is empty");
        
            for (let request of connectionRequests){
                
                if(request._id === this.props.auth.userInfo.id){
                    displayConnect = <li className="is-active" ><a aria-current="page" >Connection Sent</a></li>
                    break;
                    //console.log(displayConnect);
                    //break;
                }
                else {
                    displayConnect = <li className="" ><a aria-current="page" onClick={this.connectWithUser}>Connect</a></li>
                }
            }
        }
        else {
            displayConnect = <li className="" ><a aria-current="page" onClick={this.connectWithUser}>Connect</a></li>
        }

        if(connections.length !== 0){
            
             for(let connection of connections){
                if(connection._id === this.props.auth.userInfo.id){
                    displayConnect = <li className="" ><a aria-current="page" onClick={this.disconnectWithUser}>Disconnect from user</a></li>
                }
            } 
        }

        if(this.props.err.hasError === true){
            //console.log(this.props.err.err.response.data);
            alert(this.props.err.err.response.data.error);
        }

        if(this.props.authUser === this.props.selectedUser){
            return (
                <div className="profileNavigation" style={{marginBottom: "10px"}}>
                        <nav className="breadcrumb is-medium is-centered has-dot-separator" aria-label="breadcrumbs">
                            <ul>
                                <li className="" onClick={this.onSubmit} ref = {(el) => { this.logsLink = el; }}><Link to={this.props.match.url}>Logs</Link></li>
                                <li ref = {(el) => { this.connectionsLink = el; }}><Link to={this.props.match.url + "/connections"} href="#">Connections</Link></li>
                                <li ref = {(el) => { this.messageLink = el; }}><Link href="#" to="/messages">Messages</Link></li>
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
                                <li ref = {(el) => { this.messageLink = el; }}><Link href="#" to="/messages">Message Me</Link></li>
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
        auth: state.auth,
        err: state.err
    }
}

export default withRouter(connect(mapStateToProps, {
    sendConnection: sendConnection
})(profileNavigation));