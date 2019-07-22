import { 
    GET_SELECTED_CONVERSATION, 
    GET_NEW_SELECTED_CONVO, 
    LOAD_COMPONENT, 
    CLEAR_SELECTED_CONVERSATION } from "../actions/types";

const initialState = {
    selectedConversation: {},
    loading: false,
    error: null,
    isNewConvo: false
}

const selectedConvoReducer = (state=initialState, action) => {
    if(action.type === GET_SELECTED_CONVERSATION){
        return {
            ...state,
            selectedConversation: action.payload,
            loading: false,
            error: null,
            isNewConvo: false
        }
    }
    else if (action.type === GET_NEW_SELECTED_CONVO){
        return {
            ...state,
            selectedConversation: action.payload,
            loading: false,
            error: null,
            isNewConvo: true
        }
    }
    else if (action.type === LOAD_COMPONENT){
        return {
            ...state,
            loading: true,
            error: null,
            isNewConvo: false
        }
    }
    else if (action.type === CLEAR_SELECTED_CONVERSATION){
        return {
            ...state,
            selectedConversation: {},
            loading: false,
            error: null,
            isNewConvo: false
        }
    }
    else {
        return {
            ...state
        }
    }
}

export default selectedConvoReducer;