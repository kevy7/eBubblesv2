/*
This function is used to retreive the logged-in user's information
*/
const jwtDecode = require('jwt-decode');


const decodeToken = () => {
    //retrieving the token from localStorage
    const token = window.localStorage.getItem("token");

    const userToken = token.split(" ");

    const userInfo = jwtDecode(userToken[1]); //This will decode our token for us. We need to gain access to the token somehow

    return userInfo; //this will return to us a payload -- basically an object that will contain the current user's login information
        //password will not be given here

    //use .id if you want to return the id
    //or .user if you want to return the username
}

export default decodeToken;