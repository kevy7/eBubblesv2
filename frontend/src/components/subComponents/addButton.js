import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class addButton extends Component {

    render() {
        return (
            <div className="addButton">
                <div className="container">
                    <nav className="breadcrumb is-right is-large" aria-label="breadcrumbs">
                        <ul>
                            <li><Link to="/events/new" className="fas fa-plus-circle is-large" href=""></Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default withRouter(addButton);