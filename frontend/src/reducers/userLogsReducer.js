import { GET_USER_LOGS } from "../actions/types";

const initialState = {
    loading: false, 
    userLogs: []
};

const userLogsReducer = (state = initialState, action) => {
    if(action.type === GET_USER_LOGS) {
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