import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../../styles/eventsNavigation.css';
import { getEvents } from '../../actions';
import AddButton from './addButton';
import { ADDRCONFIG } from 'dns';

class eventsNavigation extends Component {

    state = {
        searchBar: ""
    }

    handleInputChanges = async (e) => {

        //If the route is "/events" then perform the ajax call below
        //You need to learn and understand how to use asynchronous functions
        await this.setState({[e.target.name]: e.target.value});

        this.props.getEvents(this.state.searchBar);

        //However, if the route is "/users", then perform the ajax call below
    }

    render() {

        return (
            <div className="eventsNavigation container">
                <nav className="breadcrumb has-dot-separator is-centered is-medium" aria-label="breadcrumbs">
                    <ul>
                        <li className=""><Link to="/events">Events</Link></li>
                        <li><Link to="/users">Users</Link></li>
                        <li><a href="#">Components</a></li>
                        <li><a href="#" aria-current="page">Breadcrumb</a></li>

                        <input 
                            className="input is-rounded eventSearch" 
                            type="text" 
                            placeholder="Search for events..."
                            name="searchBar"
                            value={this.state.searchBar} 
                            onChange={this.handleInputChanges}
                        ></input>
                        <AddButton />
                    </ul>
                    
                </nav>
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        
    }
}

export default withRouter(connect(mapStateToProp, {
    getEvents: getEvents
})(eventsNavigation));