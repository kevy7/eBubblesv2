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
        //select: false //This means that this field will not be queried from the database or is not accessible from the database
    },
    timeStamp: Date,
    //This should be removed because this is no longer needed and not best practice
    events: [
        {
            //These are the id's or list of events that the user created
            //I placed an array of 'Event' Id's in here because the user will create more than one event
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Events'
        }
    ],
    connections: [
        {
            //Once this user accept's a request, both user will become connections
            //And the user who is sitting in the connection request will be removed from connectionRequests
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    connectionRequests: [
        {
            //This userid's will be placed in here if they're trying to request a connection with a user
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

//userSchema.plugin(passportLocalMongoose); //We're basically plugging in methods from passportLocalMongoose into our userSchema

module.exports = mongoose.model("User", userSchema);
