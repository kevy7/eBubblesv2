import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import Styles from './Droppable.module.css';

class DroppableComponent extends Component {
    render (){
        return (
            <div className="droppableComponent">

            </div>
        )
    }
}

export default DroppableComponent;