import axios from 'axios';
//import jwtDecode from 'jwt-decode';

import setAuthTokenHeader from '../utils/setAuthTokenHeader'; //Setting our authorization header to contain our token so that it can be passed for authnetication purposes
import decodeToken from '../services/decodeToken'; //This function will get the token from localStorage and decode it for us and return the user info
import { SET_CURRENT_USER } from './types';
import { SET_USER_ERROR } from './types';
import { SET_CURRENT_ERROR } from './types';
import { GET_EVENTS, LOAD_EVENTS, EVENTS_ERROR } from './types';
import { SELECT_EVENT } from './types';
import { REMOVE_EVENT } from './types';
import { LOAD_COMPONENT } from './types';
import { LOAD_LOGIN_COMPONENT } from './types';
import { GET_USER_LOGS } from './types';
import { GET_USER_PROFILE } from './types';
import { GET_USERS } from "./types";
import { SEARCH_USERS } from "./types";
import { SELECT_USERS } from "./types";
import { REMOVE_USER } from "./types";
import { REMOVE_ALL_USERS } from "./types";
import { CREATE_CONVERSATION } from "./types";
import { POST_MESSAGE } from "./types";
import { POST_NEW_MESSAGE } from "./types";
import { EDIT_MESSAGE } from "./types";
import { GET_CONVERSATIONS } from "./types";
import { GET_SELECTED_CONVERSATION } from "./types";
import { CLEAR_SELECTED_CONVERSATION } from "./types";
import { GET_NEW_SELECTED_CONVO } from "./types";

//const nothing = null;

export const registerUserAction = (userInfo, history) => dispatch => {
    //Axios request will be made in here
    axios.post("/api/register", userInfo)
    .then(userData => {
        //if the user succesfully registers, then redirect to the login page
        history.push("/login");
    }) 
    .catch(err => {
        dispatch(setCurrentError(err))
    });
}

export const loginUserAction = (userInfo, history) => dispatch => {

    //dispatch the following action type here
    //LOAD_LOGIN_COMPONENT

    //this will set loading to true for the authReducer
    dispatch({
        type: LOAD_LOGIN_COMPONENT
    })

    axios.post("/api/login", userInfo)
    .then(response => {
        /*
            Think about it, what do we want to do when the user logs in?
                -store the jwttoken into our localStorage
                -we have to decode our jwtToken
                -We also have to set the Auth Header to have and contain our token
                -setCurrentUser to whatever is decoded with the jwtToken
        */

        const { token } = response.data; //This will retrieve the token and store it in the variable called token

        window.localStorage.setItem("token", token); //This will return to us the whole token which will contain Bearer

        setAuthTokenHeader(token);
        
        //this will be dispatched to the AuthReducer
        dispatch(setCurrentUser(decodeToken())); //decodeToken will work without the need of passing in the token as an argument

        history.push("/events");
    })
    .catch(err => {
        dispatch({
            type: SET_USER_ERROR,
            payload: err
        })
    });
}

//This will set the current logged in user into your state
export const setCurrentUser = (userData) => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    }
}

export const setCurrentError = (errData) => {
    return {
        type: SET_CURRENT_ERROR,
        payload: errData
    }
} 


export const logoutUser = (history) => dispatch => {
    /*  
        think about it, what do we need to do to logout the user
            -remove the authtoken from localStorage
            -set the authTokenHeader to empty
                -with this code, if a token is not placed as an argument then it will remove whatever is set as the header
            -set the currentUser to be empty
    */
    
    //console.log("Removing the token.....");
    window.localStorage.removeItem("token");
    setAuthTokenHeader(false);
    dispatch(setCurrentUser({})); //We pass in an empty object because the current user is going to be nobody
    history.push("/");
}

export const getEvents = (queryString) => dispatch => {
    setAuthTokenHeader(window.localStorage.getItem("token"));

    dispatch({
        type: LOAD_EVENTS
    })

    const parameter = {
        params: {
            eventName: queryString
        }
    }

    axios.get("/api/events", parameter)
    .then((response) => {
        dispatch(setEvents(response.data));
    })
    .catch((err) => {
        dispatch({
            type: EVENTS_ERROR,
            payload: err
        })
    });
}

export const setEvents = (events) => {
    return {
        type: GET_EVENTS,
        payload: events
    }
}

export const postEvent = (event, history) => dispatch => {
    //make an post api call here to post your event to your database
    axios.post("/api/events", event) //Is event the body of the html request?
    .then(resp => {

        //response will go in here
        //redirect the user to the created event
        history.push("/events");
    })
    .catch(err => {
        dispatch(setCurrentError(err));
    });
}

export const removeCurrentEvent = () => dispatch  => {
    dispatch({
        type: REMOVE_EVENT
    });
}

export const getCurrentEvent = (eventID) => dispatch => {
    /*
        axios call to get your current event
    */
    setAuthTokenHeader(window.localStorage.getItem("token"));

    const url = "/api/events/" + eventID;

    axios.get(url)
    .then(res => {
        //Dispatch the actions here into your state
        //console.log(res.data);
        
        dispatch({
            type: SELECT_EVENT,
            payload: res.data
        })

    })
    .catch(err => {
        dispatch(setCurrentError(err));
    });
}

export const updateCurrentEvent = (event, history) => dispatch => {
    setAuthTokenHeader(window.localStorage.getItem("token"));

    //Make an axios call to update your event

    const url = "/api/events/" + event.eventID;
    const redirectURL = "/events/" + event.eventID; 

    axios.put(url, event)
    .then(res => {
        history.push(redirectURL);
    })
    .catch(err => [
        dispatch(setCurrentError(err))
    ])
}

export const deleteCurrentEvent = (eventID, history) => dispatch => {
    setAuthTokenHeader(window.localStorage.getItem("token"));

    ///api/events/:id
    const url = "/api/events/" + eventID;

    axios.delete(url)
    .then(res => {
        dispatch(setEvents(res.data));
        
    })
    .catch(err => {
        dispatch(setCurrentError(err));
    })
}

export const addComment = (commentInfo) => dispatch => {
    
    const eventID = commentInfo.eventID;
    const url = "/api/events/" + eventID + "/comment";

    axios.post(url, commentInfo)
    .then(res => {
        //Comment should be added in the database in here
        //Re-get the current event and load refresh the state
        //getCurrentEvent(eventID);

        //console.log(res.data);

         dispatch({
             type: SELECT_EVENT,
             payload: res.data
         });
    })
    .catch(err => {
        dispatch(setCurrentError(err));
    })
}

//action created to editComment
export const editComment = (commentInfo) => dispatch => {
    //const commentID = commentInfo.commentID;
    const eventID = commentInfo.eventID;

    const url = "/api/events/" + eventID + "/comment";

    axios.put(url, commentInfo)
    .then(res => {
        dispatch({
            type: SELECT_EVENT,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(setCurrentError(err));
        console.log(err);
    })
}

export const removeComment = (commentInfo) => dispatch => {

    const url = "/api/events/" + commentInfo.eventID + "/comment";

    //to pass in body data via a delete requust, it is different compared to a get, post, and put request
    axios.delete(url, {data: commentInfo})
    .then(res => {
        //console.log(res.data);
        dispatch({
            type: SELECT_EVENT,
            payload: res.data
        })

    })
    .catch(err => {
        dispatch(setCurrentError(err));
    });
}


//Log participant to an event
export const logUserToEvent = (logInfo) => dispatch => {
    const url = "/api/events/" + logInfo.eventID + "/join";

    //logInfo needs to have logInfo.userId

    axios.post(url, logInfo)
    .then(res => {
        dispatch({
            type: SELECT_EVENT,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(setCurrentError(err));
    });
}



//remove participant from an event
export const removeUserFromEvent = (logInfo) => dispatch => {

    const url = "/api/events/" + logInfo.eventID + "/unjoin";

    axios.delete(url, {data: logInfo})
    .then(res => {
        dispatch({
            type: SELECT_EVENT,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(setCurrentError(err));
    });

}

export const getUserLogs = (logInfo) => dispatch => {

    const url = "/api/user/" + logInfo.userID +"/logs";

    dispatch({
        type: LOAD_COMPONENT
    })


    axios.get(url, logInfo)
    .then( res => {
        //We need to dispatch our userLogs here
        //We need to create a userLogs reducer
        dispatch({
            type: GET_USER_LOGS,
            payload: res.data
        })

    })
    .catch(err => {
        dispatch(setCurrentError(err));
    })
}

export const getUserProfile = (userID) => dispatch => {
    const url = "/api/user/" + userID;

    dispatch({
        type: LOAD_COMPONENT
    })

    axios.get(url)
    .then(res => {
        //create a reducer here
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(setCurrentError(err));
    });
}

export const getUsers = (queryString) => dispatch => {

    const url = "/api/users";

    setAuthTokenHeader(window.localStorage.getItem("token"));

    dispatch({
        type: LOAD_COMPONENT
    })

    const parameter = {
        params: {
            userName: queryString
        }
    }

    axios.get(url)
    .then(res => {
        //Need to create a users reducer
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(setCurrentError(err));
    })

}

export const sendConnection = (userIDs) => dispatch => {
    //return userIDs.authUser
    //userIDs.selectedUser

    const url = "/api/user/" + userIDs.selectedUser + "/connect";

    axios.post(url, userIDs)
    .then(res => {
        //dispatch something in here
        //Nothing needs to be dispatched, we only needed to post something and don't need it to be returned
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(setCurrentError(err));
    })
}

export const removeUserConnection = (userData) => dispatch => {

    //userdata should contain these two items
    //selectedUserID
    //authID

    console.log("you're making an api call to remove user connection");

    const url = "/api/user/" + userData.authID + "/connect";

    console.log(url);

    axios.delete(url, {data: userData})
    .then(res => {
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(setCurrentError(err));
    })
}

export const addConnection = (userData) => dispatch => {

    const url = "/api/user/" + userData.authID + "/connections";

    //create an if statement to only add 

    axios.post(url, userData)
    .then(res => {
        console.log(res.data);
        dispatch({
            type: GET_USER_PROFILE,
            payload: res.data
            
        })
    })
    .catch(err => {
        dispatch(setCurrentError(err));
    })
}


//Create an action, this will not be an ajax call made to the backend
export const inputUserAction = (userData) => dispatch => {
    //Place an array in here
    //Create a loading screen
    dispatch({
        type: LOAD_COMPONENT
    })

    dispatch({
        type: SEARCH_USERS,
        payload: userData
    })
}



//Create an action that will placed selected user's into an array
//These users in the array are selected to be messaged from the logged in user
//This action is for selecting users that you want to message
export const selectUsers = (user) => dispatch => {

    //console.log("selectUsers action was initiated");

    dispatch({
        type: LOAD_COMPONENT
    })

    dispatch({
        type: SELECT_USERS,
        payload: user
    })

}

//remove the selectedUser that you don't want to send a message to
export const removeSelectedUser = (user) => dispatch => {

    dispatch({
        type: LOAD_COMPONENT
    })

    dispatch({
        type: REMOVE_USER,
        payload: user
    })

}

//remove all selected users
export const removeAllSelectedUsers = () => dispatch => {
    dispatch({
        type: LOAD_COMPONENT
    })

    dispatch({
        type: REMOVE_ALL_USERS
    })
}

//Create an action to GET_CONVERSATIONS

export const getConversations = (convoData) => dispatch => {
    //console.log(convoData.users);

    const parameter = {
        params: {
            users: convoData.users
        }
    }

    const url = "/api/user/" + convoData.authUserID + "/messages";

    axios.get(url, parameter)
    .then(res => {

        if(parameter.params.users == undefined){
            //if users is undefined, then we should dispatch GET_CONVERSATIONS to get all conversations of a user instead
            dispatch({
                type: GET_CONVERSATIONS,
                payload: res.data
            })
        }
        else {
            //Else, if users is defined and there is something in the array, dispatch a GET_SELECTED_CONVERSATION instead
            dispatch({
                type: GET_SELECTED_CONVERSATION,
                payload: res.data 
            })
        }
    })
    .catch(err => {
        dispatch({
            type: SET_CURRENT_ERROR,
            payload: err
        })
    })
}


export const getSelectedConversation = (convoData) => dispatch => {

    const url = "/api/user/" + convoData.authUserID + "/messages/" + convoData.messageID;
    //console.log(convoData.users);

    //GET_NEW_SELECTED_CONVO user this when a new conversation is created

    axios.get(url, convoData)
    .then(res => {
        return dispatch({
            type: GET_SELECTED_CONVERSATION,
            payload: res.data
        })
    })
    .catch(err =>{
        return dispatch({
            type: SET_CURRENT_ERROR,
            payload: err
        })
    })
}

export const clearSelectedConvo = () => dispatch => {
    //This action is used to clear the selected conversation. This will be used if the user is in the path
    // "/messages/new"
    dispatch({
        type: CLEAR_SELECTED_CONVERSATION
    })

}

//Create an action to POST a conversation into a database
export const createConversation = (convoData) => dispatch => {

    /*
        Expected data:
        {
            authUserID,
            users,
            message
        }

    */

    const url = "/api/user/" + convoData.authUserID + "/conversation";

    // /api/user/:id/conversation

    axios.post(url, convoData)
    .then(res => {
        dispatch({
            type: GET_NEW_SELECTED_CONVO, //GET_SELECTED_CONVERSATION //replace this with GET_NEW_CONVO
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_CURRENT_ERROR,
            payload: err
        })
    })



}

//push message into an existing conversation between usrs
export const postMessage = (messageData) => dispatch => {

    /*
        Data to pass down via our post message request

        authUserID: messageData.authUserID
        messageID: messageData.messageID

        message: req.body.message,
        sender: req.params.id, //same as authUserID
        senderName: req.body.authName,
        timeStamp: new Date()

    */

    const url = "/api/user/" + messageData.authUserID + "/messages/" + messageData.messageID;

    axios.post(url, messageData)
    .then(res => {
        dispatch({
            type: POST_MESSAGE,
            payload: res.data //We want to return an updated conversation
        })
    })
    .catch(err => {
        dispatch({
            type: SET_CURRENT_ERROR,
            payload: err
        })
    })

}

export const postNewMessage = (messageData) => dispatch => {
    const url = "/api/user/" + messageData.authUserID + "/messages/" + messageData.messageID;
    axios.post(url, messageData)
    .then(res => {
        dispatch({
            type: POST_NEW_MESSAGE,
            payload: res.data //We want to return an updated conversation
        })
    })
    .catch(err => {
        dispatch({
            type: SET_CURRENT_ERROR,
            payload: err
        })
    })
}


//Create an action to POST a message into a conversation

//action to post a new suggestion into a user event
export const postNewActivity = (activityData) => dispatch => {
    /*
        activity data object should contain the following

        activityName: req.body.activityName,
        activityDescription: req.body.activityDescription,
        activityDate: new Date(),
        createdby: req.body.createdby, //the user's id
        eventID <-- this is simply needed to identify the event that the activity is created under

    */
    const url = "/api/events/" + activityData.eventID + "/activity";

    axios.post(url, activityData)
    .then(res => {
        //set a dispatch to return the res.data
        dispatch({
            type: SELECT_EVENT,
            payload: res.data
        });
    })
    .catch(err => {
        //dispatch and return the error message when it is retreived
        //for now, we won't dispatch an error to our reducer
    })
}



