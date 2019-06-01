import { GET_USER_PROFILE, LOAD_COMPONENT } from "../actions/types";

const initialState = {
    loading: false,
    userProfileInfo: {},
    error: null
}

export default (state= initialState, action) => {
    if(action.type === LOAD_COMPONENT){
        return {
            ...state,
            loading: true,
            error: null
        }
    }
    else if (action.type === GET_USER_PROFILE){
        return {
            ...state,
            loading: false,
            userProfileInfo: action.payload,
            
        }
    }
    else {
        return {
            ...state
        }
    }
}

//export default userProfileReducer;