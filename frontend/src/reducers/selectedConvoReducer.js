import { GET_SELECTED_CONVERSATION, LOAD_COMPONENT } from "../actions/types";

const initialState = {
    selectedConversation: {},
    loading: false,
    error: null
}

const selectedConvoReducer = (state=initialState, action) => {
    if(action.type === GET_SELECTED_CONVERSATION){
        return {
            ...state,
            selectedConversation: action.payload,
            loading: false,
            error: null
        }
    }
    else if (action.type === LOAD_COMPONENT){
        return {
            ...state,
            loading: true,
            error: null
        }
    }
    else {
        return {
            ...state
        }
    }
}

export default selectedConvoReducer;