import { GET_USER_LOGS } from "../actions/types";
import { LOAD_COMPONENT } from "../actions/types";

const initialState = {
    loading: false, 
    userLogs: [],
    error: null
};

const userLogsReducer = (state = initialState, action) => {
    if(action.type === LOAD_COMPONENT){
        return {
            ...state,
            loading: true,
            error: null
        }
    }
    else if(action.type === GET_USER_LOGS) {
        return {
            ...state,
            loading: false,
            userLogs: action.payload
        }
    }
    else {
        return {
            ...state
        }
    }
}

export default userLogsReducer;