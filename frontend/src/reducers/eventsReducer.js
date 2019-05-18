import { GET_EVENTS, LOAD_COMPONENT } from '../actions/types';

const initialState = {
    loading: false, 
    events: [],
    error: null
};

const eventsReducer = (state = initialState, action) => {
    if (action.type === LOAD_COMPONENT){
        return {
            ...state,
            loading: true,
            error: null
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