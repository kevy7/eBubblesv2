import { GET_USERS, LOAD_COMPONENT } from '../actions/types';

const initialState = {
    loading: false,
    users: [],
    error: null
}

const getUsersReducer = (state = initialState, action) => {

    if(action.type === LOAD_COMPONENT){
        return {
            ...state,
            loading: true,
            error: null
        }
    }
    else if (action.type === GET_USERS){
        return {
            ...state,
            loading: false,
            users: action.payload
        }
    }
    else {
        return {
            ...state
        }
    }
 
}

export default getUsersReducer;