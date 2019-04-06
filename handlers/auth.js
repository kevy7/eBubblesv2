/*

This file shouldn't be needed anymore, please delete this when you can



*/




const Users = require('../models/users'); //grab our user model
//might need to grab other/more db models and place them in here as well
const jwt = require('jsonwebtoken'); //already npm installed this
//A token will be created when a user signs up or log ins succesfully
const secretorkey = "this is a secret"; //going to create a secret here for now


exports.signin = function(){

};



exports.signup = function(req, res, next){
    try {
        //we want to create a user here
        // we then want to create a token (this is also called signing a token)

        //remember, json web token contains three things
        /*
            payload(data)
            header
            signature
                this is important to creating these tokens
                this is where our secret key will be stored
            

                we will store our secret key in a .env file
                    to use our .env file, we need to install the follwing:
                    npm install dotenv

                by placing the code to your main index.js file, it will load all of you environment variables

                require("dotenv").config();
        */

        let user = await Users.create(req.body); //create the user in the db

        //pull in email and userName from the user above
        //this is needed so that we don't always have to type user.firstName, user.lastName, or user.email
        let { firstName, lastName, email, userName } = user;
        // We will sign a token below
        let token = jwt.sign({
            //these are the values passed to the token
            //Below, this means that if I decrypt the token, I will have access to the following variables below
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName, userName
        }, secretorkey
        ); //a secret key needs to be passed down above
        return res.status(200).json({
            firstName,
            lastName,
            email,
            userName,
            token
        });

    }
    catch {
        //see what kind of error
        //if iti is a certain err, we can respond with username/email is already taken
        //ideally, we want to send back a pretty helpfull error so that the user will know what they did wrong
        

        //
        if (err.code === 11000){
            err.message = "Sorry, that user/email is taken";
        }
        return next({
            status: 400,
            mesage: err.message
        });
    }
};


/*
    Last stopped at 9:17 of 'Storing Passwords Properly'

*/


