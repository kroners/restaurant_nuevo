'use strict'

const passport = require ('passport');
const LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// passport need to serialize and deserialize user instance from a sesison store in order to support login sessions
// so that every subsequent request will not contain user credentials. Two methods:

module.exports = function(passport) {

console.log("inside authenticate.js");

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
  console.log("passport serializeUser");
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(username, done) {
  console.log("passport deserializeUser");
	User.findOne({ username: username }, function (err, user) {
        console.log("found one");
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function(req, username, password, done) {
    console.log("inside passport");
    console.log(username);
    console.log(password);
    console.log(req.body);
    User.findOne({ 'local.email': username }, function(err, user) {
      // console.log(err);
      // console.log(user);
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' , reason: User.reasons.failedLogin.NOT_FOUND });
      }
      
      if(user.isLocked) {
        //just increment login attempts if account is already locked
        return user.incLoginAttemps(function(err) {
          if (err) return done(err);
          return done(null, null, User.reasons.failedLogin.MAX_ATTEMPS);
        });
      }

      if (!user.comparePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      return done(null, user);
    });
  }
));

// passport.use(new LocalStrategy(
// 	function(username, password, done) {
// 		findUser(username, function(err, user) {
// 			if (err) { return done(err) }

// 			if (!user) { return done(null, false) }

// 			if (password !== user.password ) {
// 				return done(null, false)
// 			}

// 			return done(null, user)
// 		})
// 	}
// ))

// // other supporting functions

// function findUser (username, callback) {
//   if (username === user.username) {
//     return callback(null, user)
//   }
//   return callback(null)
// }
}
