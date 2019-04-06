/*
This code will act as our authentication middleware and will be used in our index.js file
*/

const JwtStrategy = require("passport-jwt").Strategy; //These are functions pulled from passport-jwt
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../models/users");
const keys = require("./key.js");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_Payload, done) => {
            User.findById(jwt_Payload.id)
            .then(user => {
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
        })
    );
}