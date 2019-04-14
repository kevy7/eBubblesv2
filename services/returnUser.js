const jwt = require('jsonwebtoken');

/* const userToken = req.headers.authorization;
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
    } */
module.exports = function returnUser(jwtToken, keys) {  
    const token = jwtToken.split(" ");
    return jwt.verify(token[1], keys.secretOrKey, function(err, decoded){
        //This should return user information
        if(err){
            return "err, token could not be decoded";
        }
        else {
            //console.log(decoded);
            return decoded; //this is returning the user
        }
    })
}