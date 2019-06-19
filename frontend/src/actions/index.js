import axios from 'axios';
//import jwtDecode from 'jwt-decode';

import setAuthTokenHeader from '../utils/setAuthTokenHeader'; //Setting our authorization header to contain our token so that it can be passed for authnetication purposes
import decodeToken from '../services/decodeToken'; //This function will get the token from localStorage and decode it for us and return the user info
import { SET_CURRENT_USER } from './types';
import { SET_CURRENT_ERROR } from './types';
import { GET_EVENTS } from './types';
import { SELECT_EVENT } from './types';
import { REMOVE_EVENT } from './types';
import { LOAD_COMPONENT } from './types';
import { GET_USER_LOGS } from './types';
import { GET_USER_PROFILE } from './types';
import { GET_USERS } from "./types";
import { SEARCH_USERS } from "./types";

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

        dispatch(setCurrentUser(decodeToken())); //decodeToken will work without the need of passing in the token as an argument

        history.push("/events");
    })
    .catch(err => {
        dispatch(setCurrentError(err));
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
        type: LOAD_COMPONENT
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
        dispatch(setCurrentError(err));
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
    axios.post("/api/events", event)
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

    //console.log(userData);

    //no url is needed
    dispatch({
        type: SEARCH_USERS,
        payload: userData
    })

}