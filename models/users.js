/*
In here, we are creating a database model (mongodb) to store user information
*/

//Setup
var mongoose = require("mongoose");
//var passportLocalMongoose = require("passport-local-mongoose");
//const bycrypt = require('bycrypt');
    //this is used to has our passwords and store them into our database first



var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timeStamp: Date,
    events: [
        {
            //These are the id's or list of events that the user created
            //I placed an array of 'Event' Id's in here because the user will create more than one event
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Events'
        }
    ]
});




//userSchema.plugin(passportLocalMongoose); //We're basically plugging in methods from passportLocalMongoose into our userSchema

module.exports = mongoose.model("User", userSchema);
