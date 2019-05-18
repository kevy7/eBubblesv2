import React, {Component} from 'react';

class profileNavigation extends Component {
    render(){
        return (
            <div className="profileNavigation">
                <div className="columns">
                    <div className="column is-one-third">
                    </div>

                    <div className="column">
                        <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
                            <ul>
                                <li className="is-active"><a href="#">Logs</a></li>
                                <li><a href="#">Connections</a></li>
                                <li><a href="#">Messages</a></li>
                                <li className=""><a href="#" aria-current="page">Events</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}
export default profileNavigation;