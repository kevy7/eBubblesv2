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

            </div>
        )
    }
}

DroppableComponent.propTypes = {
    dropID = PropTypes.string //the droppable id given to our columns. helps us identify the column, we're dragging items into
}

export default DroppableComponent;