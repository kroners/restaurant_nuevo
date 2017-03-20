'use strict'

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
	name: {
		first: String,
		last: String
	},
    local: {
        email: String,
        password: String,
    },
	dni: String,
	age: Number,
	sex: String,
	address: String,
	city: String,
	phone_number: String
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

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.local.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema)