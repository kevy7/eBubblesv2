import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserHero from './subComponents/UserHero';
import EventBubble from './subComponents/eventBubble';
import { getEvents } from '../actions';
import EventsNavigation from './subComponents/eventsNavigation';
import AddButton from './subComponents/addButton';

class Events extends Component {
    state = {
        fakeData: [],
        fakeErrors: null
    }
   
    componentDidMount = () => {
        console.log("events were retreived");
        
        this.props.getEvents(); //This action is called to make an api request to get a list of events from our database for us
        
    }

    render(){

     /*    
       if(this.props.events.events){
                this.props.events.events.map(event => {
                    return <EventBubble 
                        img={event.eventImage}
                        eventName={event.eventName}
                        eventID={event._id}
                        key={event._id}
                    />
                });
            }   
         */
        


        return(
            <div>
                <UserHero userName={this.props.auth.userInfo.name}/>
                <EventsNavigation />
                <AddButton />
                <div className="container is-mobile">
                    <div className="contianer is-multiline columns">
                        <EventBubble 
                            img="https://images.unsplash.com/photo-1506598417715-e3c191368ac0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                            eventName="Event Name Here"
                            eventID="ID is going to be placed in here"
                        />
                        
                        
                        {/*
                            //This code doesn't work when we refresh the page
                            this.props.events && this.props.events.events.map(event => {
                                return <EventBubble 
                                    img={event.eventImage}
                                    eventName={event.eventName}
                                    eventID={event._id}
                                    key={event._id}
                                />
                            }) 
                            //console.log(this.props.events.events) //it says no token was sent
                            */
                        }
                        
                    </div>
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