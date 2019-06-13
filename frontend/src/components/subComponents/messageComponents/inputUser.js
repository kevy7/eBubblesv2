import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import '../../../styles/inputUser.css';

class inputUser extends Component {


    render(){


        return (
            <div className="inputUser field">
                {/* <label className="label">Name</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Input name here" />
                </div> */}

                <div className="inputContainer">
                    <span className="to">
                        To:
                    </span>
                    {/* place card selectors in here */}
                    <div className="contactChip">
                        {/* <figure className="image is-32x32" id="ContactChipFigure">
                            
                            <img className="image is 32x32 is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                            
                            
                        </figure> */}
                        usernamehere
                        
                        {/* add some kind of close btn here */}

                    </div>

                    <input className="inputUserField" type="text" /> {/* As something get's type, search for a user */}
                </div>
                

            </div>
        )
    }
}

export default inputUser;