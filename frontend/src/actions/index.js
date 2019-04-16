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

export const getEvents = () => dispatch => {
    setAuthTokenHeader(window.localStorage.getItem("token"));
    axios.get("/api/events")
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
        //history.push("/events")
        //console.log(res.data);
        
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

export const removeComment = (commentInfo) => dispatch => {

    const url = "/api/events/" + commentInfo.eventID + "/comment";

    //to pass in body data via a delete requust, it is different compared to a get, post, and put request
    axios.delete(url, {data: commentInfo})
    .then(res => {
        console.log(res.data);

    })
    .catch(err => {
        dispatch(setCurrentError(err));
    });
}