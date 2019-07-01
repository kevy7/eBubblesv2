/*
export const CREATE_CONVERSATION = "CREATE_CONVERSATION";
export const POST_MESSAGE = "POST_MESSAGE";
export const EDIT_MESSAGE = "EDIT_MESSAGE";
export const GET_CONVERSATIONS = "GET_CONVERSATIONS";
*/

import { GET_CONVERSATIONS, } from "../actions/types";

const initialState = {
    conversations: [],
    loading: false,
    error: null
}

export const getConversationsReducer = (state=initialState, action) => {
    if(action.type === GET_CONVERSATIONS){
        return {
            ...state,
            conversations: action.payload,
            loading: false,
            error: null
        }
    }
    else if (action.type === ""){

    }
    else if (action.type === loading){
        return {
            ...state,
            loading: true
        }
    }
    else {
        return {
            ...state
        }
    }
}