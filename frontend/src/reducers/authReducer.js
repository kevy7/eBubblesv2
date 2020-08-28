import authenticate from "../services/authenticate";

import { 
    SET_CURRENT_USER, 
    LOAD_LOGIN_COMPONENT, 
    SET_USER_ERROR 
} from '../actions/types';

const initialState ={
    isAuthenticated: false,
    userInfo: {},
    loading: false,
    error: null
}

//This reducer will run when the user is trying to login
export default (state = initialState, action) => {
    if (action.type === SET_CURRENT_USER){
        return {
            ...state,
            isAuthenticated: authenticate(), //authenticate is going to return true or false based on if we can decode the user's jwt token
            userInfo: action.payload,
            loading: false
        }
    }
    else if (action.type === LOAD_LOGIN_COMPONENT){
        return {
            ...state,
            loading: true
        }
    }
    else if(action.type === SET_USER_ERROR){
        return {
            ...state,
            error: action.payload,
            loading: false
        }
    }
    else {
        return state;
    }
}