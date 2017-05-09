'use strict'

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var // these values can be whatever you want - we're defaulting to a
    // max of 5 attempts, resulting in a 2 hour lock
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 2 * 60 * 60 * 1000;

const UserSchema = Schema({
	name: {
		first: String,
		last: String
	},
    local: {
        email: String,
        password: String,
    },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number },
    lastLogin: Date
	// dni: String,
	// age: Number,
	// sex: String,
	// address: String,
	// city: String,
	// phone_number: String
})

UserSchema.statics.exists = function(email, callback){
    this.findOne({'local.email': email}, function (err, user){
      if(err){
        return callback(err);
      }
      if(!user){
        return callback(null, null);
      }else if(user){
        return callback(null, user);
      }
    });
};

UserSchema.virtual('isLocked').get(function() {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

UserSchema.pre('save', function (next) {
    console.log("pre-save operations");
    var user = this;
    console.log(user);
    console.log(this);
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            console.log("presal");
            console.log(salt);
            if (err) {
                console.log("salt");
                return next(err);
            }
            bcrypt.hash(user.local.password, salt, function (err, hash) {
                console.log("local.password");
                if (err) {
                    return next(err);
                }
                user.local.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) { // cb -> means callback
    bcrypt.compare(passw, this.local.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.methods.incLoginAttempts = function(cb) {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        }, cb);
    }
    // otherwise we're incrementing
    var updates = { $inc: { loginAttempts: 1 } };
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + LOCK_TIME };
    }
    return this.update(updates, cb);
};

// expose enum on the model, and provide an internal convenience reference 
var reasons = UserSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 3
};

module.exports = mongoose.model('User', UserSchema);