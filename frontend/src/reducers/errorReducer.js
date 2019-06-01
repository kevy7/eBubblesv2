import { SET_CURRENT_ERROR } from "../actions/types";

const initialState = {
    err: {},
    hasError: false
}

const errorReducer = (state = initialState, action) => {
    if(action.type === SET_CURRENT_ERROR) {
        return {
            ...state,
            hasError: true,
            err: action.payload
        }
    }
    else {
        return {
            ...state,
            hasError: false
        }
    }
}

export default errorReducer;