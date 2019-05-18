import { SELECT_EVENT } from "../actions/types";
import { REMOVE_EVENT } from "../actions/types";
import { LOAD_COMPONENT } from "../actions/types";

const initialState = {
    selectedEvent: {},
    loading: false,
    error: null
}

const selectEventReducer = (state = initialState, action) => {
    if(action.type === LOAD_COMPONENT){
        return {
            ...state,
            loading: true
        }
    }
    else if(action.type === SELECT_EVENT){
        return {
            ...state,
            selectedEvent: action.payload,
            loading: false
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