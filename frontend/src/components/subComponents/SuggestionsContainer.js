import React, { Component } from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import Styles from '../../styles/suggestionsContainer.module.css';

import DroppableComponent from './DnDComponents/DroppableComponent/DroppableComponent';
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from 'constants';

/*

This container is used for the suggestions component
Idea: Users can recommend suggestions or tasks to do on a planned trip
    -People can look at the list of suggestions and agree to vote on the ones that they want to go to together

*/


class SuggestionsContainer extends Component {
    //For now, we're creating static temporary data for the suggestions and activities array. The backend will be worked on later.
    state = {
        suggestions: [
            { id: "e1", event: "event 1" },
            { id: "e2", event: "event 2" },
            { id: "e3", event: "event 3" },
        ], //static at the moment, these are list of suggestions on a trip
        activities: [
            { id: "e4", event: "event 4" },
            { id: "e5", event: "event 5" },
            { id: "e6", event: "event 6" },
            { id: "e7", event: "event 7" },
        ] //static at the moment, these are list of suggestions that everyone agreed to go to
    }

    render(){
        //function used to handle dragged elements
        const onDragEnd = (result) => {
            //pulls the needed data from the result argument
            let { destination, source, draggableId } = result;

            //if the item was dropped out of bounds and into no destination, then return nothing
            if(!destination){
                return;
            }

            //if an item was moved within the same droppable element, then perform the following function below
            if(source.droppableId === destination.droppableId){

            }
            //else, item must've been moved from one droppable component to another
            else {
                
            }

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
                        activities={this.state.suggestions}
                        title="Suggestions"
                        //we also need to pass in each components, their own arrays. This one should be suggestions
                    />
                    <DroppableComponent 
                        droppableId="activitiesCol"
                        activities={this.state.activities}
                        title="Activities"
                        //pass in the activities array here
                    />

                </DragDropContext>
            </div>
        )
    }
}

export default SuggestionsContainer;