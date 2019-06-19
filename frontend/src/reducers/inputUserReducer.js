import { SEARCH_USERS, LOAD_COMPONENT } from '../actions/types';

const initialState = {
    loading: false,
    searchedUsers: []
}

const inputUserReducer = (state=initialState, action) => {
    //action.payload //will give us an array of users

    //console.log(action.paload);

    if(action.type === LOAD_COMPONENT){
        return {
            ...state,
            loading: true
        }
    }
    else if(action.type === SEARCH_USERS){
        return {
            ...state,
            loading: false,
            searchedUsers: action.payload
        }
    }
    else {
        return {
            ...state
        }
    }

}

export default inputUserReducer;