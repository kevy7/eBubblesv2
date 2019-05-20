import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

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

    render(){

        return (
            <div className="profileNavigation">
                <div className="columns">
                    <div className="column is-one-third">
                    </div>

                    <div className="column">
                        <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
                            <ul>
                                <li className="" onClick={this.onSubmit} ref = {(el) => { this.logsLink = el; }}><Link to={this.props.match.url}>Logs</Link></li>
                                <li ref = {(el) => { this.connectionsLink = el; }}><Link to={this.props.match.url + "/connections"} href="#">Connections</Link></li>
                                <li ref = {(el) => { this.messageLink = el; }}><a href="#" onClick={this.onSubmit}>Messages</a></li>
                                <li className="" ref = {(el) => { this.eventsLink = el; }}><a href="#" aria-current="page">Events</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(profileNavigation);