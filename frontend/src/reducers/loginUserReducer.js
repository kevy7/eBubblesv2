import { LOAD_LOGIN_COMPONENT } from '../actions/types';

initialState = {
    loginLoading: false
}

export const loginUserReducer = (state = initialState, action) => {
    //if action.type is something, set the return the new state here
    //use a switch statement here
    if(action.type === LOAD_LOGIN_COMPONENT){
        return {
            ...state,
            loginLoading: true
        }
    }
    else {
        return {
            ...state,
            loginLoading: false
        }
    }
}