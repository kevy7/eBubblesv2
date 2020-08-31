import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import UserHero from './subComponents/UserHero';
import EventBubble from './subComponents/eventBubble';
import ProgressBar from './subComponents/progressBar';
import { getEvents } from '../actions';
import EventsNavigation from './subComponents/eventsNavigation';
import AddButton from './subComponents/addButton';
import EventBubbles from './subComponents/eventBubbles';

class Events extends Component {
    state = {
        fakeData: [],
        fakeErrors: null
    }

    render(){
        /* if(this.props.events.loading === true){
            return <ProgressBar />
        } */

        return(
            <div>
                <UserHero />
                <EventsNavigation />
                <div className="container is-mobile">
                    <hr />
                    {/*<div className="contianer is-multiline columns">*/}
                        {
                            <EventBubbles />
                        }
                    {/*</div>*/}
                    <br />
                </div>   
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        auth: state.auth,
        events: state.events
     }
}

export default withRouter(connect(mapStateToProps, {
    //Actions will go in here but you would need to import it first
    getEvents: getEvents
})(Events));