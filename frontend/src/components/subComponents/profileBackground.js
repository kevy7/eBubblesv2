import React, {Component} from 'react';
import "../../styles/profileBackground.css";

class profileBackground extends Component {

    render(){
        const divStyle = {
            
            //background: 'url(' + this.props.selectedEvent.selectedEvent.eventImage + ')'
            background: 'url(' + this.props.bgImage + ')',
            height: "270px"
        };

        return (
            <div className="profileBackground">
                <div className="eventHero" >
                    <section className="hero is-medium"  style={divStyle}>
                        <div className="hero-body" >
                            <div className="container">
                                
                                <figure 
                                    className="image is-128x128 userImage"
                                    style={{
                                        width: "200px",
                                        marginTop: "10px"
                                    }}
                                    >
                                    <img 
                                        style={{
                                            width: '180px',
                                            height: '180px'
                                        }}
                                        className="is-rounded"
                                        id="profileImage"
                                        src="https://images.unsplash.com/photo-1490087763596-862a8bfcc16c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                                    />
                                    {/*
                                    <h6 className="subtitle is-6 has-text-centered">
                                        user Name here
                                    </h6>
                                    */}
                                </figure>
                                
                                
                            </div>
                        </div>
                    </section>
                </div>


            </div>
        )
    }
}

export default profileBackground;