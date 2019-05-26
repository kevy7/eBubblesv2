import React, { Component } from 'react';

class connectionCard extends Component {

    render(){
        return (
            <div className="connectionCard">
                <div className="box">
                        <div className="columns">
                            <div className="column is-one-fifth">
                                <figure className="image is-128x128">
                                    
                                    <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                    
                                </figure>
                            </div>
                            <div className="column">
                                <p className="title is-4">Name Here</p>
                                <p className="subtitle is-6">username here</p>
                                <p>
                                    Sent you a connection request
                                </p>
                            </div>
                        </div>
                    <div className="field is-grouped is-grouped-right">
                        <div className="buttons">
                        <button className="button is-warning">Reject</button>
                        <button className="button is-info">Accept</button>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        )
    }
}

export default connectionCard;