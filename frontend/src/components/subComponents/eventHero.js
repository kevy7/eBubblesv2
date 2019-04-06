import React, { Component } from 'react';
import { connect } from 'react-redux';

//import "../../styles/eventHero.css";

class eventHero extends Component {
    
    render() {
        const divStyle = {
            color: 'blue',
            background: 'url(' + this.props.selectedEvent.selectedEvent.eventImage + ')'
        };

        return (
            <div className="eventHero" >
                <section className="hero is-medium"  style={divStyle}>
                    <div className="hero-body" >
                        <div className="container">
                        
                            
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedEvent: state.selectedEvent
    }
}

export default connect(mapStateToProps)(eventHero);