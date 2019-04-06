import authenticate from "../services/authenticate";

import { SET_CURRENT_USER } from '../actions/types';

const initialState ={
    isAuthenticated: false,
    userInfo: {}
}

//This reducer will run when the user is trying to login
export default (state = initialState, action) => {
    if (action.type === SET_CURRENT_USER){
        return {
            ...state,
            isAuthenticated: authenticate(), //authenticate is going to return true or false based on if we can decode the user's jwt token
            userInfo: action.payload
        }
    }
    else {
        return state;
    }
}