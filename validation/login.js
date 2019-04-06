const Validator = require("validator");
const isEmpty = require("is-empty");

//This function will be used to validate the user's login information to check if everything is 
    //in the correct format and is there
module.exports = function validateLoginInput (data) {
    let errors = {}; //errors is set to be an empty object at the moment

    /*
        user's are going to log in with their username and password
    */

    data.userName = !isEmpty(data.userName) ? data.userName : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if(Validator.isEmpty(data.userName)){
        errors.userName = "userName cannot be empty";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "password cannot be empty";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}