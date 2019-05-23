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
                        
                        <div className="column">
                            <Hero title="Event Bubbles" subtitle=""/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserHero;