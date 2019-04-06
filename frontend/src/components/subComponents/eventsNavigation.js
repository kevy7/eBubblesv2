import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../../styles/eventsNavigation.css';

class eventsNavigation extends Component {

    state = {
        fakeDate: ""
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

                        <input className="input is-rounded eventSearch" type="text" placeholder="Search for events..."></input>
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        events: state.events
    }
}

export default withRouter(connect()(eventsNavigation));