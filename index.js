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
var User = require("./models/users");
var Events = require("./models/events");
var Comments = require("./models/comments");


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
                console.log("event id's match");
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

    //find the user based on it's username
    //if username is not found, let the user know
    User.findOne({ userName }, function (err, user){
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

//passport.authenticate('jwt', {session: false})


//I'll worry about adding in authentication to my api calls later.
//Now, I just want to focus more on my routes and I'll do the authentication later

//verifyToken is our middleware used to verify or authenticate a user when they're trying to reach a private route

//Get Request, to get our events
app.get('/api/events/', verifyToken, function(req, res){
    
    //We don't need to res.render anything, we just need to display everything that is currently in our database at the moment
    Events.find({}, function(err, events){
        if (err){
            res.send(err);
        }
        else {
            res.json(events); //We're going to send a JSON of all of our events listed in our database
            //Rather than passing an object to our ejs file, we want to do something different
            //Now that we're creating an api, we want to write the following code instead

        }
    })
});



app.post('/api/events', function(req, res){
    //Making a post request via an api request
    //When making an api post request, we can send data in the 'body' of the url request
    //In order to access the data from the body, we have to download a package called body-parser

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

    console.log(eventData);

    Events.create(eventData, function(err, event){
        if(err){
            res.send(err);
        }
        else{
            User.findById(req.body.userID, function(err, user){
                if(err){
                    res.send(err);
                }
                else {
                    //user exists in here
                    user.events.push(event);

                    user.save(function(err, data){
                        if(err){
                            res.send(err);
                        }
                        else {
                            //Okay, this works. Inside users, their events will populate and events will populate with the user's id that created the event
                            console.log(data);
                            res.send(event);
                        }
                    });
                    
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

    Events.findById(eventId, function(err, event){
        if(err){
            console.log(err);
        }
        else {
            Events.findOneAndRemove({ _id: event._id }, function(err){
                if(err){
                    res.send(err);
                }
                else {
                    //The event was removed here
                    res.json({message: "The event was removed"});
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
        commentCreatedBy: req.body.userID,
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
                            res.json(data); //send back the data
                        }
                    })
                }
            });
        }
    });
});

//Add route to edit comments
app.delete('/api/events/:id/comment', function(req, res){

    const commentID = req.body.commentID;

    //Events.findOneAndRemove({ _id: event._id }, function(err){
    Comments.findOneAndRemove({_id: commentID}, function(err, res){
        if(err){
            res.send(err);
        }
        else {
            console.log("the comment should be removed");
            console.log(res); //This is just sending us the original comment

            //You should find an event here and return it, that way the updated comments will be returned
        }
    });

});


//add route to delete comments



//Our api requests/routes should be complete





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
