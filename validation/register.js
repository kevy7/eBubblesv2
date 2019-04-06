const Validator = require('validator');
//this library will help us validate whether a string is actually in email format or any other formats as well
const isEmpty = require('is-empty');
//isEmpty will just return true or false based on if a variable, array, object, etc. will be empty or not

module.exports = function validateRegiserInput (data) {

    let errors = {}; //in errors will be stored in here
    
    //convert any empty data to an empty string
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
        //basically, if data.firstName is empty, then assign it to be an empty string instead
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.userName = !isEmpty(data.userName) ? data.userName : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //checks if first or lastname is empty
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First name required";
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last name is required";
    }

    //checks if the username is empy 
    if (Validator.isEmpty(data.userName)) {
        errors.userName = "user name is required";
    }

    //checks on email
    if (Validator.isEmpty(data.email)) {
        errors.email = "email is required";
    }

    if(!Validator.isEmail(data.email)){
        errors.email ="Email must be in correct format";
    }

    //password checks
    if (Validator.isEmpty(data.password)){
        errors.password = "password can't be empty";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })){
        errors.password = "Password must be at least 6 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors) //if there are no errors then return true, if there are errors then return false
    }

}
