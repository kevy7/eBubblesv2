import { SELECT_EVENT } from "../actions/types";
import { REMOVE_EVENT } from "../actions/types";

const initialState = {
    selectedEvent: {}
}

const selectEventReducer = (state = initialState, action) => {
    if(action.type === SELECT_EVENT){
        return {
            ...state,
            selectedEvent: action.payload
        }
    }
    else if (action.type === REMOVE_EVENT){
        return {
            ...state,
            selectedEvent: {}
        }
    }
    else {
        return {
            ...state
        }
    }
}

export default selectEventReducer;