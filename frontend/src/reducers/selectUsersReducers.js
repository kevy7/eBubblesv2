import { LOAD_COMPONENT, SELECT_USERS } from '../actions/types';

const initialState = {
    loading: false,
    selectedUsers: []
}

/*
How to push data into an array

case ADD_ITEM :
    return { 
        ...state,
        arr: [...state.arr, action.newItem]
    }


*/

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
            loading: false,
            selectedUsers: [...state.selectedUsers, action.payload] //this should allow us to push data into our selectedUsers array using a redux reducer
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