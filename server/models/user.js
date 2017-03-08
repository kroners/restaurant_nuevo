'use strict'

const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
	name: {
		first: String,
		last: String
	},
	email: String,
	password: String,
	address: String,
	city: String,
	phone_number: String
})