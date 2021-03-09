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

    //function used to handle dragged elements
    onDragEnd = result => {

        //pulls the needed data from the result argument
        let { destination, source } = result;

        //if the item was dropped out of bounds and into no destination, then return nothing
        if(!destination){
            return;
        }

        //if an item was moved within the same droppable element, then perform the following function below
        if(source.droppableId === destination.droppableId){
            /*
                variables to use
                source.index - index of the draggable element that user selected and is trying to move
                destination.index - index of where that draggable element was placed in
            */

            const newList = this.reorderList(source.droppableId, source.index, destination.index); //Will return an updated array list
            
            if(source.droppableId === "suggestions"){
                //if changes were made only within the suggestions component, then re-order it's activities
                this.setState({...this.state,
                    suggestions: newList});
            }
            else {
                //else, if changes were made to the activities component, then re-order it's activities instead
                this.setState({...this.state,
                    activities: newList});
            }

        }
        //else, item must've been moved from one droppable component to another
        else {
            const newLists = this.moveAndReorder(source.droppableId, destination.droppableId, source.index, destination.index);

            //update the state with the newly return list of suggestions/activities
            this.setState({
                ...this.state,
                suggestions: newLists["suggestions"],
                activities: newLists["activities"]
            })
        }

    }

    //function used to reorder your list of elements that are within the same droppable component
    reorderList = (droppableId, sourceIdx, destIdx) => {

        //First, let's retreive our state array, it should be the suggestions or activity list based on the droppableID that's given to us
        const activities = Array.from(this.state[droppableId])
        //remove the activity with SourceIdx from array. Basically, we're removing the dragged activity from the user within the array
        let [removedActivity] = activities.splice(sourceIdx, 1);
        //re-add the activity to it's new index
        activities.splice(destIdx, 0, removedActivity);

        return activities;
    }

    moveAndReorder = (sourceDropId, destDropId, sourceIdx, destIdx) => {
        //retreive copy of activities from suggestions/activities array within our state
        const sourceActivities = Array.from(this.state[sourceDropId]);
        const destActivities = Array.from(this.state[destDropId]);
        let result = {};

        //remove item from your sourceActivities array
        let [removedActivity] = sourceActivities.splice(sourceIdx, 1);

        //add the removed item into the destActivites array
        destActivities.splice(destIdx, 0, removedActivity);

        //add arrays into the result object
        result[sourceDropId] = sourceActivities;
        result[destDropId] = destActivities;

        return result;
    }

    render(){
        return (
            <div className={Styles.suggestionsContainer}>
                <div className={Styles.suggestions}>
                {/* create two droppable components here */}
                <DragDropContext
                    draggable="true"
                    onDragEnd={this.onDragEnd}
                >
                    {/* droppable components will go in here */}
                    <DroppableComponent 
                        droppableId="suggestions"
                        activities={this.state.suggestions}
                        title="Suggestions"
                        //we also need to pass in each components, their own arrays. This one should be suggestions
                    />
                    <DroppableComponent 
                        droppableId="activities"
                        activities={this.state.activities}
                        title="Activities"
                        //pass in the activities array here
                    />

                </DragDropContext>
                </div>
            </div>
        )
    }
}

export default SuggestionsContainer;