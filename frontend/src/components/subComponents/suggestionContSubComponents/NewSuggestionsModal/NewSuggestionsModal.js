import React, { Component } from 'react';

import Styles from './NewSuggestionsModal.module.css';

/*

This component is the module that pops up when the user clicks on the New Activity button

*/

const NewSuggestionsModal = (prop) => {
    return (
        <div>
            {/* use is-active to show the modal */}
            <div className="modal">
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <h1 className="title">New Activity</h1>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input class="input" type="text" placeholder="Text input" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Message</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="Textarea"></textarea>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-link is-light">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
    )
}

export default NewSuggestionsModal;