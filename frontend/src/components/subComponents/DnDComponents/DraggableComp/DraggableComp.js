import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import DraggableCard from './DraggableCard/DraggableCard';

class DraggableComp extends Component {

    render(){
        return (
            <div className="draggableComp">
                <Draggable
                    draggableId={this.props.draggableId}
                    index={this.props.index}
                >
                    { (provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >   
                            <DraggableCard />
                            {/* Drag me! {this.props.event} */}
                        </div>
                    )}
                </Draggable>

            </div>
        )
    }
}

DraggableComp.propTypes = {
    index: PropTypes.number,
    draggableId: PropTypes.string,
    event: PropTypes.string
}

export default DraggableComp;