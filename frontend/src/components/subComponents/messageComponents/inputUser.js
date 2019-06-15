import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';

import '../../../styles/inputUser.css';
import ContactChip from './contactChip';

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
                    {/* This should probably be it's own component */}
                    <ContactChip />

                    <input className="inputUserField" type="text" /> {/* As something get's type, search for a user */}

                    {/* use is hidden to hide the component below */}
                    <div className="box displayUserBox">
                        <p>Display list of users when typing in the input textbox</p>
                    </div>
                    
                </div>
                

            </div>
        )
    }
}

export default inputUser;