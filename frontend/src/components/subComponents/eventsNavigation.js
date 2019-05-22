import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../../styles/eventsNavigation.css';
import { getEvents } from '../../actions';

class eventsNavigation extends Component {

    state = {
        searchBar: ""
    }

    handleInputChanges = (e) => {
        this.setState({[e.target.name]: e.target.value});

        

        console.log(this.state.searchBar);

        /* const queryString = {
            eventName: this.state.searchBar
        } */

        this.props.getEvents(this.state.searchBar);
    }

    render() {

        return (
            <div className="eventsNavigation container">
                <nav className="breadcrumb has-dot-separator is-centered is-medium" aria-label="breadcrumbs">
                    <ul>
                        <li className="is-active"><a href="#">Events</a></li>
                        <li><a href="#">Friends</a></li>
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