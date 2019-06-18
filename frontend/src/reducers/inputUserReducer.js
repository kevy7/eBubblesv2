import { INPUT_USER, LOAD_COMPONENT } from '../actions/types';

const initialState = {
    loading: false,
    inputUsers: []
}

const inputUserReducer = (state=initialState, action) => {
    //action.payload //will give us an array of users

    if(action.payload === LOAD_COMPONENT){
        return {
            ...state,
            loading: true
        }
    }
    else if(action.payload === INPUT_USER){
        return {
            ...state,
            loading: false,
            inputUsers: action.payload
        }
    }
    else {
        return {
            ...state
        }
    }

}

export default inputUserReducer;