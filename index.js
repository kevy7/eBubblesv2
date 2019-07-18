/*

git push -u origin master

*/

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json()); //This is going to allow us to access data stored in 'body' when making a post or put request
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require("mongoose"); //This is so we can connect to our database via by mongoosedb
const path = require('path');
var uri = require("./config/key").mongoURI;

//got this code from: https://medium.com/@chloechong.us/how-to-deploy-a-create-react-app-with-an-express-backend-to-heroku-32decfee6d18
// Serve static files from the React frontend app

//app.use(express.static(path.join(__dirname, 'frontend/build')))








//const olduri = "mongodb://localhost:27017/reference_demo";
mongoose.connect(uri, { useNewUrlParser: true }, function(err, client) {
    if(err){
        console.log(err);
    }
    else {
        console.log("you're connected to your cloud db");
        //console.log(client);
    }
});
port = process.env.PORT || 5000;




/*
User authentication libraries are going to be declared in here
*/
var passport = require("passport"); //used for authentication
//var LocalStrategy = require("passport-local"); //If i recalled correctly, we're having user authentication be stored in our own database rather than having user's singing in with facebook or google
//var passportLocalMongoose = require("passport-local-mongoose");
//var methodOverride = require("method-override"); //needed in order to be able to make a 'PUT' request. Not sure if this is even needed with React

//AUTHENTICATION LIBRARIES FOR JWT AUTHENTICATION IS LISTED BELOW
const bcrypt = require ("bcryptjs"); //used to create a hash when registering users - hashing pw
const jwt = require("jsonwebtoken"); //use to create jwt tokens to authenticate users
//passport middleware
app.use(passport.initialize());
//Passport Config file that we created
require("./config/passport")(passport);



/*
Import models for our database and they're going to be imported here
*/
//Models
var User = require("./models/users");
var Events = require("./models/events");
var Comments = require("./models/comments");
var Logs = require("./models/logs");
var Message = require("./models/message");
var Conversation = require("./models/conversation");


/*
Importing functions i created from other .js files
*/
const validateLoginInput = require("./validation/login");
const validateRegisterInput = require("./validation/register");
const keys = require("./config/key");

//ERROR - check this
const returnUser = require("./services/returnUser");
//import returnUser from "./services/returnUser";

//JSON WEB Token Middleware
//Below, is my personally created JSON Web token middleware

verifyToken = (req, res, next) => {
    const userToken = req.headers.authorization;
    if(!userToken){
        res.json({ errorMessage: "No Token was sent"});
    }
    else {
        const token = userToken.split(" "); //We're splitting the token based on space
        jwt.verify(token[1], keys.secretOrKey, function(err, decoded){
            if(err){
                //if the json token cannot be verified, an error will be thrown in here
                res.send(err);
            }
            else {
                //it looks like the token was succesfulley decoded return next below
                next();
            }
        });
    }
}

//Middleware for authenticating token and authorizing the user
//Create the middleware here when needed
authorizeUser = (req, res, next) => {
    //authenticate the token first
    //Only call an api request to this route if your're authenticated to access this post route
    const eventID = req.params.id; //gets the eventID from the url
    const userToken = req.headers.authorization;

    Events.findById(eventID).populate("createdby").exec(function(err, event){
        if(err){
            res.send("couldn't find the event");
        }
        else {
            const user = returnUser(userToken, keys);

            if(event.createdby._id == user.id) {
                //console.log(returnUser(userToken, keys));
                next();
            }
            else{
                //next();
                res.json("unable to make that request. User is unathorized to edit/delete this event.");
            }
        }
    });
}

//Verify user comment
authorizeUserComment = (req, res, next) => {
    const commentID = req.body.commentID;
    const userToken = req.headers.authorization;

    Comments.findById(commentID, function(err, comment){
        if(err){
            res.send(err);
        }
        else{
            const user = returnUser(userToken, keys);

            if(comment.commentCreatedBy == user.id){
                next();
            }
            else {
                res.json("unable to make the request. User is unauthorized to edit/delete this comment");
            }
        }
    });
}


/*
User registration route
*/
app.post("/api/register", function(req, res){
    //User <-- this is the model that stores your user's information

    const { errors, isValid } = validateRegisterInput(req.body);
    //We're going to return the variable 'errors' and 'isValid' based on what is sent in the body
    //basically if there are errors, then send the following JSON request below

    if (!isValid){
        //if is valid is not true (basically if it's false) then return the list of errors to the user
        return res.status(400).json(errors);
    }

    //We're finding the userName in the database, if they're found then let the user know
    User.findOne({userName: req.body.userName}, function(err, userName){
        if(userName){
            return res.status(400).json({ userName: "userName already exists"});
        }
        if(err){
            return res.json(err); //return error if there are any
        }
    });

    //create an object with list of information needed to register user -- data if given from req.body
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password //Remember, this has to be hashed before placing in the database!!!!
    }


    //Would a .save() function work better than the .create() function for storing the user into my database?
    //following code is used to create a hash/salt and store that into our database
    bcrypt.genSalt(10, (err, salt) => {
        //This is going to generate a 'salt' for us first
        //Now, we will hash our password below
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            //hash will be created here
            if (err) throw err; //If there is an error then throw that error first
            newUser.password = hash; //password is now assigned as the created hash

            //This code fucken works!!!!
            //check to see if I should be using a save() function instead of a .create() function
            User.create(newUser, function(err, user){
                if (err){
                    res.json(err);
                    //Login the user here as well

                }
                else {
                    res.json(user); //return the newly created user with their hashed password
                }
            });
        });
    });
});



//To setup our login route, we need to create our passport.js file first
//USER Login route is setup to be in here. Registration route works but now it's just up to if the login route will even work
app.post("/api/login", function(req, res){

    //validate the user's pw and username to see if they're not emepy
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid){
        return res.status(400).json(errors);
    }

    //place the userName and PW into a variable
    const userName = req.body.userName;
    const password = req.body.password;

    //Testint the ability to hide and manually populating passwords

    //find the user based on it's username
    //if username is not found, let the user know
    User.findOne({ userName }).select("+password").exec(function (err, user){
        if(!user){
            return res.status(404).json({ userNameNotFound: "userName not found"});
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                const payload = {
                    id: user.id,
                    name: user.userName
                }

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 //1 Year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                            //user succesfully logged in because they were given a token
                        });
                    }
                )
            }
            else {
                return res.status(400).json({ passwordIncorrect: "Password incorrect"});
            }
        })
    })

    //use bycrypt.compare to check if hashed version of entered password matches with the hash stored in our database
    //Sign/create a JWT token

});

//Get Request, to get our events
app.get('/api/events/', verifyToken, function(req, res){

    //Look up querystrings, to determine how to filter your event searches based on a condition set by a user
    //console.log(req.query.eventName);

    //Refer to this, to determine how to query based on if an event name will contain the following text
    //{ "authors": { "$regex": "Alex", "$options": "i" } }

    let queryString;

    if(req.query.eventName && req.query.eventName !== ""){
        queryString = {
            eventName: { 
                "$regex": req.query.eventName, //This is needed so that we can search for an event if it contains what the user types
                "$options": "i" 
            }
        }
    }
    else {
        queryString = null;
    }
    
    //We don't need to res.render anything, we just need to display everything that is currently in our database at the moment
    Events.find(queryString, function(err, events){
        if (err){
            res.send(err);
        }
        else {
            res.json(events);
        }
    })
});


app.post('/api/events', function(req, res){

    //Event data
    var eventData = { 
        eventName: req.body.eventName,
        eventImage: req.body.eventImage,
        eventDate: req.body.eventDate,
        timestamp: new Date(),
        eventDescription: req.body.eventDescription,
        eventStreetAddress: req.body.eventStreetAddress,
        eventCity: req.body.eventCity,
        eventState: req.body.eventState,
        eventZipCode: req.body.eventZipCode,
        createdby: req.body.userID //This is being returned as a string, I think that's where the issue lies
        //createdby: req.user._id //Gives us the id of the current user
        //I'm assuming we can access the user's id via the token that was sent
   };

    Events.create(eventData, function(err, event){
        if(err){
            res.send(err);
        }
        else{
            
            //Let's make sure that we create a log in our database first before we send the event back to the user
            const userLog = {
                user: req.body.userID,
                event: event._id,
                type: "Event",
                log: "Created an event",
                timeStamp: new Date(),
                image: event.eventImage
            }
            //This log shows us that the user created an event

            Logs.create(userLog, function(err, log){
                if(err){
                    res.send(err);
                }
                else {
                    //Sending my event after my log was succesfully created
                    res.send(event);
                }
            })
        }
    }); 
       
});


//This code works
//Get a specific event based on id
app.get("/api/events/:id", verifyToken, function(req, res){
    //console.log("this get request is working" + req.params.id);
    var eventID = req.params.id; //This will allow us to gain access to the id placed in the url

    //populate("eventParticipants")
    Events.findById(eventID).populate("eventComments").populate("createdby").exec(function(err, event){
        if(err){
            res.send(err);
        }
        else {
            res.json(event);
        }
    });
});

app.put('/api/events/:id', [verifyToken, authorizeUser], function(req, res){
    const eventId = req.params.id;

    Events.findById(eventId, function(err, event){
        if(err){
            res.send(err);
        }
        else {
            //Need to write a code here that checks if a req.body is empty, if it is then don't update the event within our database
            event.eventName = req.body.eventName;
            event.eventImage = req.body.eventImage;
            event.eventDate = req.body.eventDate;
            event.eventDescription = req.body.eventDescription;

            //Event's address info
            event.eventStreetAddress = req.body.eventStreetAddress;
            event.eventCity = req.body.eventCity;
            event.eventState = req.body.eventState;
            event.eventAddress = req.body.eventAddress;

            event.save(function(err){
                //We're going to save our updates
                if(err){
                    res.send(err);
                }
                else {
                    res.json(event); //We're sending back the updated event to the user
                }
            });
        }
    });
});

app.delete('/api/events/:id', [verifyToken, authorizeUser], function(req, res){
    const eventId = req.params.id;

    //Need to fix this, not sure why I'm finding the event twice
    Events.findById(eventId, function(err, event){
        if(err){
            console.log(err);
        }
        else {
            Events.findOneAndRemove({ _id: event._id }, function(err, data){
                if(err){
                    res.send(err);
                }
                else {
                    //The event was removed here
                    //res.json({message: "The event was removed"});

                    Logs.deleteMany({event: event._id}, function(err, log){
                        if(err){
                            res.send(err);
                        }
                        else {
                            Events.find({}, function(err, events){
                                if(err){
                                    res.send(err);
                                }
                                else {

                                    //I should probably delete all comments associated with the event as well
                                    res.send(events);
                                }
                            })
                        }
                    })
                }
            });
        }
    });
});


//Comment routes/request

app.post('/api/events/:id/comment', function(req, res){
    //console.log(req.body);
    var eventId = req.params.id;
    var comment = {
        comment: req.body.comment,
        timestamp: new Date(),
        commentCreatedBy: req.body.commentCreatedBy,
        userName: req.body.userName
    }

    Comments.create(comment, function(err, comment){
        if(err){
            res.send(err);
        }
        else {
            //find the event based on it's id above
            Events.findById(eventId).populate("eventComments").exec(function(err, event){
                if(err){
                    res.send(err);
                }
                else {
                    //push the comment into our event here
                    event.eventComments.push(comment);

                    event.save(function(err, data){
                        if(err){
                            res.send(err);
                        }
                        else {

                            //The event is accessible in here as "data"
                            const userLog = {
                                user: req.body.commentCreatedBy, //For some reason userID is not being passed into the database
                                event: data._id,
                                comment: comment._id,
                                type: "Comment",
                                log: "Commented in the event " + data.eventName,
                                timeStamp: new Date(),
                                image: data.eventImage
                            }
                            Logs.create(userLog, function(err, log){
                                if(err){
                                    res.send(err);
                                }
                                else {
                                    console.log(log)
                                    res.json(data);
                                }
                            })


                            //res.json(data); //send back the data
                        }
                    })
                }
            });
        }
    });
});


//add route to edit comments
app.put('/api/events/:id/comment', function(req, res){
    const commentID = req.body.commentID;
    Comments.findById(commentID, function(err, comment){
        if(err){
            res.send(err);
        }
        else{
            comment.comment = req.body.comment;
            comment.save(function(err, data){
                if(err){
                    res.send(err);
                }
                else {
                    //console.log(data);
                    Events.findById(req.params.id).populate("eventComments").exec(function(err, event){
                        if(err){
                            res.send(err);
                        }
                        else {
                            res.send(event);
                            console.log(event);
                        }
                    })
                }
            })
        }
    })
});

//Add route to delete comments
app.delete('/api/events/:id/comment', function(req, res){

    const commentID = req.body.commentID;

    //Events.findOneAndRemove({ _id: event._id }, function(err){
    Comments.findOneAndRemove({_id: commentID}, function(err, comment){
        if(err){
            res.send(err);
        }
        else {

            Events.findById(req.params.id).populate("eventComments").exec(function(err, event){
                if(err){
                    res.send(err);
                }
                else {
                    res.send(event);
                }
            })
        }
    });
});


//Api requests here



//Request to send a connection request

    //User.connectionRequests





//Api request to join an event
    //Events.eventParticipants
    //this is used to gain access to your event participants
    // /api/events/:id/join

app.post('/api/events/:id/join', function(req, res){

    Events.findById(req.params.id).populate("eventComments").exec(function(err, event){
        if(err){
            res.send(err);
        }
        else {
            //the event is located here
            // user.events.push(event); //an example of how to push data into your array of objects
            event.eventParticipants.push(req.body.userId);

            event.save(function(err, data){
                //updated event with the participant added will be returned here
                if(err){
                    res.send(err);
                }
                else{
                    //res.send(event);
                    //send back the updated event
                    //user joined an event
                    const userLog = {
                        user: req.body.userId, //For some reason userID is not being passed into the database
                        event: data._id,
                        type: "Event",
                        log: "Joined the event: " + data.eventName,
                        timeStamp: new Date(),
                        image: data.eventImage
                    }

                    Logs.create(userLog, function(err, log){
                        if(err){
                            res.send(err);
                        }
                        else {
                            res.send(data); //we're sending back the updated event
                        }
                    })
                }
            }) 
        }
    })
});


//Api request to unjoin from an event

        //Use the below as reference

        /* User.update( {_id: req.user._id}, 
            { $pull: {posts: req.body.post_id } } 
            )
            .then( err => {
            ...
        }); */

        /* db.stores.update(
            { },
            { $pull: { fruits: { $in: [ "apples", "oranges" ] }, vegetables: "carrots" } },
            { multi: true }
        ) */

app.delete("/api/events/:id/unjoin", function(req, res){
    //This route will remove the user from the event

    Events.update({_id: req.params.id},
        {$pull: {eventParticipants: req.body.userID}} //This is used to remove data from an array
    )
    .then( data => {
        //With this, we can return our user the selectedEvent with updated data
        Events.findById(req.params.id).populate("eventComments").exec(function(err, event){
            if(err){
                res.send(err);
            }
            else {
                //Create a log here

                const logData = {
                    user: req.body.userID, //For some reason userID is not being passed into the database
                    event: req.params.id,
                    type: "Event",
                    log: "Unjoined from the event: " + event.eventName,
                    timeStamp: new Date()
                }

                Logs.create(logData, function(err, log){
                    if(err){
                        res.send(err);
                    }
                    else {
                        res.send(event);
                    }
                })

                //console.log(event);
            }
        })
    })
})






//Make a request to get all logs from a user

app.get("/api/user/:id/logs", function(req, res){
    //get information about the user

    //information retreived for a user needs to be filtered based on if you're viewing another user's page or if you're viewing your page
    //This is not needed as of yet, since my user proile page's are very simple
    const userID = req.params.id; //User's id will be retreived via from the body upon a request

    User.findById(userID, function(err, user){
        //We should now not be able to view the user's hashed password
        if(err){
            res.send(err);
        }
        else {
            Logs.find({user: mongoose.Types.ObjectId(userID)}).sort({timeStamp: 'descending'}).exec(function(err, logs){
                if(err){
                    res.send(err);
                }
                else {
                    //Testing to see if the our logs and user will be returned
                    res.send(logs);
                    //console.log(user);
                }
            })
        }

    })
});

//get user information
//Making a get request to GET profile information from a user
app.get("/api/user/:id", function(req, res){

    const userID = req.params.id;
    //Users.find().select("-password")

    //password will be excluded from the query, we don't want anyone to see anybody else's hashed password
    User.findById(userID).populate("connections").populate("connectionRequests").select("-password").exec(function(err, user){
        if(err){
            res.send(err);
        }
        else {
            res.send(user);
            //console.log(user);
        }
    })
});


//Backend api call to get users
app.get("/api/users", function(req, res){

    let queryString;

    if(req.query.userName && req.query.userName !== ""){
        queryString = {
            userName: { 
                "$regex": req.query.userName, //This is needed so that we can search for an event if it contains what the user types
                "$options": "i" 
            }
        }
    }
    else {
        queryString = null;
    }

    //    User.findById(userID).select("-password").exec(function(err, user){
    // this is another way of exluding password from being shown with redux
    User.find(queryString, "-password", function(err, users){
        if(err){
            res.send(err);
        }
        else {
            res.send(users);
        }
    })
})


//Route to send connection requests to the user
app.post("/api/user/:id/connect", function(req, res){

    userID = req.params.id; //this is the selectedUser
    //req.body.authUser //This is the authUser


    //Before the auth user even thinks about sending a request to the selectedUser, check that the selectedUser already didn't send you a request
    //Both user's shouldn't have the ability to send each other requests


    User.findById(req.body.authUser, function(err, authUser){
        const poop = true;

        //if(user.connections.map(user=>user.toString()).includes(req.body.selectedUserID) !== true){

            console.log("the auth user does not have the selectedUser in it's list of connectionRequests");

            User.findById(userID, { "new":true }).populate("connectionRequests").populate("connections").exec(function(err, user){

                //Logged in user can't send a connection request if:
                /*
                    the logged in user is in the selected user's list of connectionRequest
                    the logged in user's list of connectionReq/connections does not contain the selectedUser's id
                */
                if(authUser.connectionRequests.map(user=>user.toString()).includes(userID) !== true 
                    && authUser.connections.map(userconn=>userconn.toString()).includes(userID) !== true 
                    && user.connectionRequests.map(userConReq=>userConReq.toString().includes(req.body.authUser) !== true)
                    ){


                    user.connectionRequests.push(req.body.authUser);

                    user.save(function(err, data){

                        
                        if(err){
                            res.send(err);
                        }
                        else {
                            res.send(data); //returning the user back to us, not sure if this is needed but will send back just in case
                        }

                    })
                }
                else {
                    console.log("woahhh, these users's are already either linked or have sent each other a connection request");
                    res.status(400).json({error: "Request Error: The user is already either a connection or sent a connecton Request"});

                }




            })


    })

    

})

//DELETE request to delete the user from connectionRequest
app.delete("/api/user/:id/connect", function(req, res){

//selectedUserID
    console.log("selectedUser: " + req.body.selectedUserID);
    console.log("authUser: " + req.params.id);

    User.update({_id: req.params.id},
        {$pull: {connectionRequests: req.body.selectedUserID}} //This is used to remove data from an array

    )
    .then( data => {
        //this code works!!!

        User.findById(req.params.id, function(err, user){
            if(err){
                res.send(err);
            }
            else {
                //send the user
                //res.send(user);
                //no point of creating a log here
                res.send(user);
                
            }
        })
    })
    .catch( err => {
        res.send(err);
    })
})


//This route finally works!!!!!
app.post("/api/user/:id/connections", function(req, res){
                //we set "new": true, in order to return the updated new information from the user
                User.findOneAndUpdate({_id: req.params.id}, {$pull: {connectionRequests: req.body.selectedUserID}}, { "new":true }, function(err, updateUser){
                    if(err){
                        console.log(err);
                    }
                    else {
                        //if the logged in user does not have the selectedUser in it's connections array, then perform the following code below
                        if(updateUser.connections.map(user=>user.toString()).includes(req.body.selectedUserID) !== true){
                        
                            updateUser.connections.push(req.body.selectedUserID);

                            updateUser.save(function(err, newUser){
                                if(err){
                                    res.send(err);
                                }
                                else {
                                    //issue, we also need to make a log for the selected user as well and not just for the logged in user
                                    const userLog = {
                                        user: req.params.id,
                                        connectedUser: req.body.selectedUserID,
                                        type: "Connection",
                                        log: "Connected with the user: " + req.body.selectedUserName,
                                        timeStamp: new Date(),
                                        image: "https://bulma.io/images/placeholders/128x128.png" //This is just a default image for profile pictures
                                    }

                                    newUser.populate('connections').populate('connectionRequests', function(err, populatedUser){

                                        if(err){
                                            res.send(err);
                                        }
                                        else{
                                            Logs.create(userLog, function(err, log) {
                                                if(err){
                                                    res.send(err);
                                                }
                                                else {         
                                                    User.findById(req.body.selectedUserID, function(err, selectedUser){
                                                        if(err){
                                                            res.send(err);
                                                        }
                                                        else {
                                                            //This will push the logged in user's id into the selected user list of connections as well
                                                            if(selectedUser.connections.map(user=>user.toString()).includes(newUser._id) !== true){
                                                                selectedUser.connections.push(newUser._id);
                                                                selectedUser.save(function(err, selectedData){
                                                                    if(err){
                                                                        res.send(err);
                                                                    }
                                                                    else {
                                                                        //do nothing here
                                                                        res.send(populatedUser);
                                                                        console.log(populatedUser);
                                                                    }
                                                                })
                                                            }
                                                            else{
                                                                res.status(400).send("The selected user is already a connection");
                                                            }
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                })
                                }
                            })
                        }
                        else {
                            res.status(400).json({error: "The selected user is already a connection"});
                        }
                    }
                })
})

//create a conversation with a user
//if no conversation exists between users, then create a conversation
app.post("/api/user/:id/conversation", function(req, res){

    const users = req.body.users;
    const message = req.body.message;
    const conversationName = req.body.conversationName;

    //filter our auth user

    const convoData = {
        timeStamp: new Date(),
        conversationName: conversationName
    }

    Conversation.create(convoData, function(err, conversation){
        if(err){
            res.send(err);
        }
        else {

            users.forEach(user => {
                //for each user, push them into the newly created conversation
                conversation.users.push(user); //Each user will be passed in to the conversation collection
            })
            
            //Push the very first message to this conversation here
            //We have to create the message first and then push it's id into the conversation
            
            const messageData = {
                message: req.body.message,
                sender: req.body.authUserID,
                senderName: req.body.authName,
                timeStamp: new Date()
            }

            Message.create(messageData, function(err, message){
                if(err){
                    res.send(err);
                }
                else {
                    //push message id to conversation in here
                    conversation.messages.push(message._id);

                    conversation.save(function(err, newConvo){
                        if(err){
                            res.send(err);
                        }
                        else {
                            conversation.populate('users').populate('messages', function(err, populatedConversation){
                                res.send(populatedConversation);
                            })
                        }
                    })
                }
            })
        }
    })
})


//GET request to receive all conversations of a user
app.get("/api/user/:id/messages", function(req, res){
    /*
        Use this as reference

        db.collection.find({ "$and": [ 
            { "members": { "$all": [ "some id 1", "some id 2" ] } },
            { "members": { "$size": 2 } }
        ]})

    */

    //this is our default queryString
    let queryString = {
        "$and": [
            {users: req.params.id}
        ]
    }

    //creating for test purposes
    //solution to problem? see below
    //pass the users array in req.body, check if req.body is not empty and if it isn't use queryString2 instead
    let queryString2 = {
        "and": [
            {users: {"$all": [] } },
            {users: {"$siz": 2}} //set size equal to array.length
        ]
    }

    //get all conversations of the currently logged in user
    //get a message based on it's users
    Conversation.find(queryString).populate("messages").populate("users").exec(function(err, conversation){
        if(err){
            res.send(err);
        }
        else {
            res.send(conversation);
            //display list of messages within this conversation
        }
    })
})

//Get one conversation and all of it's messages
 app.get("/api/user/:id/messages/:messageID", function(req, res){

    console.log("hello world!!");
    console.log(req.body.users);
    console.log(req.body.authUserID);

    let queryString = {
        _id: req.params.messageID
    }

    Conversation.find(queryString).populate("messages").exec(function(err, conversation){
        if(err){
            res.send(err);
        }
        else {
            res.send(conversation);
            //When retreiving a message, find a way to retreive them in order by timestamp
        }
    })


    //Create a way to retrieve all messages of

})


//Post a new message into a conversation
app.post("/api/user/:id/messages/:messageID", function(req, res){
    const authUser = req.params.id;

    const messageData = {
        message: req.body.message,
        sender: req.params.id,
        senderName: req.body.authName,
        timeStamp: new Date()
    }

    Message.create(messageData, function(err, message){
        if(err){
            res.send(err);
        }
        else {
            
            //console.log(message._id);
            //Conversation.findById

            Conversation.findById({_id: req.params.messageID}, function(err, convo){
                if(err){
                    res.send(err);
                }
                else{
                    //res.send(message._id);
                    convo.messages.push(message._id);
                    convo.save(function(err, data){
                        if(err){
                            res.send(err);
                        }
                        else {
                            res.send(data);
                        }
                    }) 
                }
            })
        }
    })
})


//db.inventory.find( { tags: ["red", "blank"] } )
//Example of how to search for collections in an array based on a match with a collections specified value within an array

/* app.get("/api/user/:id/connections", function(req, res){
    
})
 */




//Creating route to retrieve list of connections from a user








//make sure to review RESTful routing











//check to see if we're on heroku
if(process.env.NODE_ENV === 'production') {
    //Basically, if we're in production then run the code below
    app.use(express.static('frontend/build'));

    //For any routes that gets hit here, we're going to load the react index.html file
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
 



//We're going to make our express app run on port 3000
app.listen(port, function(){
    console.log("App is running on port " + port)
});
