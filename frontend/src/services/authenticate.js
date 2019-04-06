//const jwt = require("jsonwebtoken"); //This is not needed
const jwtDecode = require('jwt-decode');


/* const authenticate = {
    isAuthenticated: false,
    authenticateUser() {
        const Token = window.localStorage.getItem("token");
        const userToken = Token.split(" ");
        if (jwtDecode(userToken[1])){
            return true;
        }
        else {
            return false;
        }
    },
    signOutUser(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
}
 */


 //It looks like this function will always return true
 const authenticate = () => {
     const Token = window.localStorage.getItem("token");
     //const userToken = Token.split(" ");

     try {
        const userToken = Token.split(" ");
        jwtDecode(userToken[1]);
        return true;
        //returns true if you can decode the token
     }
     catch {
        return false;
        //returns false if you can't decode the token
        //returns false if decoding the token gives you an error
     }
 }


export default authenticate;