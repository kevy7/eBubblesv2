import React, { Component } from 'react';

import Hero from './Hero';

class UserHero extends Component {
    

    //How to style with jsx
    //in jsx format:   <div style={{backgroundColor: 'red'}}></div>

    /*
        Gaining access to user's information via the payload when loggin in
            id: user.id,
            name: user.userName
    */
    
    render(){
        return(
            <div className="UserHero Hero">
                <div className="content">
                    <div className="columns">
                        <div className="column is-narrow">
                            <figure 
                                className="image is-128x128"
                                style={{
                                    width: "200px",
                                    marginTop: "10px"
                                }}
                                >
                                <img 
                                    style={{
                                        width: '128px',
                                        height: '128px'
                                    }}
                                    className="is-rounded"
                                    src="https://images.unsplash.com/photo-1490087763596-862a8bfcc16c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                                />
                                <h6 className="subtitle is-6 has-text-centered">
                                    {this.props.userName}
                                </h6>
                            </figure>
                        </div>
                        <div className="column">
                            <Hero title="Username's Events" subtitle="List of Available events below"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserHero;