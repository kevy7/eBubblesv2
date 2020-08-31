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
   
    componentDidMount = () => {
        
        //this.props.getEvents(); //This action is called to make an api request to get a list of events from our database for us
        //this is called with the eventBubbles component
        //const values = queryString.parse(this.props.location.search);
        
    }

    //This is needed for when events are deleted, when events are deleted, reload this page with new events
    //There is an error with this function, the page will constantly be refreshing because this page will aways be receiving new props
    componentWillReceiveProps = (nextProps) => {

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