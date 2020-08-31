import { GET_EVENTS, LOAD_EVENTS, EVENTS_ERROR } from '../actions/types';

const initialState = {
    loading: false, 
    events: [],
    error: null
};

const eventsReducer = (state = initialState, action) => {
    if (action.type === LOAD_EVENTS){
        return {
            ...state,
            loading: true,
            error: null
        }
    }
    else if (action.type === EVENTS_ERROR){
        return {
            ...state,
            loading: false,
            error: action.payload
        }
    }
    else if(action.type === GET_EVENTS) {
        return {
            ...state,
            loading: false,
            events: action.payload
        }
    }
    else {
        return {
            ...state
        }
    }
}

export default eventsReducer;