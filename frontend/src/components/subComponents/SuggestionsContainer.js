import React, { Component } from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import Styles from '../../styles/suggestionsContainer.module.css';

import DroppableComponent from './DnDComponents/DroppableComponent/DroppableComponent';

/*

This container is used for the suggestions component
Idea: Users can recommend suggestions or tasks to do on a planned trip
    -People can look at the list of suggestions and agree to vote on the ones that they want to go to together

*/


class SuggestionsContainer extends Component {
    //For now, we're creating static temporary data for the suggestions and activities array. The backend will be worked on later.
    state = {
        suggestions: [
            { id: 1, event: "event 1" },
            { id: 2, event: "event 2" },
            { id: 3, event: "event 3" },
        ], //static at the moment, these are list of suggestions on a trip
        activities: [
            { id: 4, event: "event 4" },
            { id: 5, event: "event 5" },
            { id: 6, event: "event 6" },
        ] //static at the moment, these are list of suggestions that everyone agreed to go to
    }

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
                    <DroppableComponent 
                        droppableId="suggestionsCol"
                    />
                    <DroppableComponent 
                        droppableId="activitiesCol"
                    />

                </DragDropContext>
            </div>
        )
    }
}

export default SuggestionsContainer;