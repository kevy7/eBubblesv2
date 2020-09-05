import React, { Component } from 'react';
import Styles from '../../styles/suggestionsContainer.module.css';
import { DragDropContext} from 'react-beautiful-dnd';


/*

This container is used for the suggestions component
Idea: Users can recommend suggestions or tasks to do on a planned trip
    -People can look at the list of suggestions and agree to vote on the ones that they want to go to together

*/


class SuggestionsContainer extends Component {
    render(){

        //function used to handle dragged elements
        const onDragEnd = (result) => {
            //pulls the needed data from the result argument
            let { destination, source, draggableId } = result;


        }
        return (
            <div className={Styles.suggestionsContainer}>
                {/* create two droppable components here */}
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                    {/* droppable components will go in here */}

                </DragDropContext>
            </div>
        )
    }
}

export default SuggestionsContainer;