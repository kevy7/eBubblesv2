import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import { formInputHook } from '../../../../customHooks/formInputHook';
import Styles from './NewSuggestionsModal.module.css';

/*

This component is the module that pops up when the user clicks on the New Activity button

*/

const NewSuggestionsModal = (props) => {

    const { 
        value:activityNameVal,
        onChange: activityValOnChange
    } = formInputHook('');

    const { 
        value:activityDescVal,
        onChange: activityDescValOnChange
    } = formInputHook('');

    return (
        <div>
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <h1 className="title">New Activity</h1>
                        <div className="field">
                            <label className="label">Activity Name</label>
                            <div className="control">
                                <input className="input" type="text" value={activityNameVal} onChange={activityValOnChange}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Activity Description</label>
                            <div className="control">
                                <textarea className="textarea" value={activityDescVal} onChange={activityDescValOnChange}></textarea>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-link is-light" onClick={props.handleClose}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={props.handleClose}></button>
            </div>
        </div>
    )
}

NewSuggestionsModal.propTypes = {
    handleClose: PropTypes.func,
}

export default NewSuggestionsModal;