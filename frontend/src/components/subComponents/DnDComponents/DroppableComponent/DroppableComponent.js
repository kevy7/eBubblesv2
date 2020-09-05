import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import Styles from './Droppable.module.css';

class DroppableComponent extends Component {
    render (){
        
        return (
            <div className="droppableComponent">
                <Droppable droppableId={this.props.droppableId}>
                    { (provided, snapshot) => {
                        //return a div element here
                        <div>
                            {/* dragabble components needs to be in here */}
                            
                        </div>

                    }}

                </Droppable>
            </div>
        )
    }
}

DroppableComponent.propTypes = {
    droppableId = PropTypes.string //the droppable id given to our droppable columns (we will have 2). helps us identify the column, we're dragging items into
}

export default DroppableComponent;