import { LOAD_COMPONENT, SELECT_USERS } from '../actions/types';

const initialState = {
    loading: false,
    selectedUsers: []
}

const selectUsersReducer = (state=initialState, action) => {

    if(action.type === LOAD_COMPONENT){
        return {
            ...state,
            loading: true
        }
    }
    else if (action.type === SELECT_USERS){
        return {
            ...state,
            loading: false
            /* find out how to pass in a new value into your current selectedUsers array  */
        }
    }
    else {
        return {
            ...state
        }
    }

}

export default selectUsersReducer;