import { GET_USER_PROFILE } from "../actions/types";

const initialState = {
    loading: false,
    userProfileInfo: {}
}

export default (state= initialState, action) => {
    if(action.type === GET_USER_PROFILE){
        return {
            ...state,
            userProfileInfo: action.payload
        }
    }
    else {
        return {
            ...state
        }
    }
}