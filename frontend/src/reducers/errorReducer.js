import { SET_CURRENT_ERROR } from "../actions/types";

const initialState = {
    err: {}
}

const errorReducer = (state = initialState, action) => {
    if(action.type === SET_CURRENT_ERROR) {
        return {
            ...state,
            err: action.payload
        }
    }
    else {
        return {
            state
        }
    }
}

export default errorReducer;