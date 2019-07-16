import { LOAD_COMPONENT, SELECT_USERS, REMOVE_USER, REMOVE_ALL_USERS } from '../actions/types';

const initialState = {
    loading: false,
    selectedUsers: [] //This needs to be an array of objects
}

//Okay, this function works and is able to test if an object will contain your action.payload.userID value
const checkArrayObject = (userArray, action2) => {
    let result = false;
    userArray.forEach(user => {
        if(user.userID === action2.payload.userID ){
            result = true;
        }
    });

    return result;
}


const selectUsersReducer = (state=initialState, action) => {

    if(action.type === LOAD_COMPONENT){
        return {
            ...state,
            loading: true
        }
    }
    else if (action.type === SELECT_USERS){


        //console.log(action.payload.userID);
        //Create an if statement to check if the object contains the value of action.payload.

        //checks if the object contains the userID thats passed down from action.payload
        /*
            Ex: [
                {
                    userName: "name1",
                    userID: 1
                },
                {
                    userName: "name2"
                    userID: 2
                }
            ]
        */
        //Create a function to test if your object contains the user id

        const results = checkArrayObject(state.selectedUsers, action);

        if(results === true){
            return {
                ...state,
                loading: false,
                selectedUsers: [...state.selectedUsers]
            }
        }

        return {
            ...state,
            loading: false,
            selectedUsers: [...state.selectedUsers, action.payload] //this should allow us to push data into our selectedUsers array using a redux reducer
            /* find out how to pass in a new value into your current selectedUsers array  */
        }

    }
    else if (action.type === REMOVE_USER){

        if(checkArrayObject(state.selectedUsers, action) === true){
            console.log("this is true")
            return {
                ...state,
                loading: false,
                selectedUsers: state.selectedUsers.filter(user => user.userID !== action.payload.userID)
            }
        }

        return {
            ...state,
            loading: false,
            selectedUsers: [...state.selectedUsers]
        }

    }
    else if (action.type === REMOVE_ALL_USERS){
        return {
            ...state,
            loading: false,
            selectedUsers: [] //selectedUsers will return empty
        }
    }
    else {
        return {
            ...state
        }
    }

}

export default selectUsersReducer;