import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import EventBubble from './eventBubble';
import ProgressBar from './progressBar';
//import EventBubble from './eventBubble';
import { getEvents } from '../../actions';

class eventBubbles extends Component {

    componentWillMount = () => {
        this.props.getEvents();
    }

    render(){

        if(this.props.events.loading === true){
            return <ProgressBar />
        }

        return (
            <div className="eventBubbles contianer is-multiline columns">
                {
                    //This code doesn't work when we refresh the page
                    this.props.events && this.props.events.events.map(event => {
                        return <EventBubble 
                                img={event.eventImage}
                                eventName={event.eventName}
                                eventID={event._id}
                                key={event._id}
                                userID={event.createdby}
                            />
                    }) 
                            //console.log(this.props.events.events) //it says no token was sent
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events
    }
}

export default withRouter(connect(mapStateToProps, {
    getEvents: getEvents
})(eventBubbles));