'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//uso de cookieParser
app.use(cookieParser());

const mongoose = require('mongoose')
// middleware for express session
// different from passport session. There is only one session, which is handled by express, but
// passport support 'from behind' the session hadnling by express
app.use(session({
	secret: 'mysecretkeyrestaurantapp',
	resave: true, // al igual que la opcion inferior, para evitar que se creen sesiones no deseadas
	saveUninitialized: false, // para evitar que se generen sesiones no deseadas
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	duration: 30 * 60 * 1000,
	activeDuration: 50 * 60 * 1000,
	cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();

});

// uso de passport - Inicializando passport
app.use(passport.initialize())  
app.use(passport.session())  

const path = require('path')
// set the public folder. we can put in there stylesheets etc
app.use(express.static(path.join(__dirname, '../../client')))

console.log("ghi");
const api = require('../routes/routes')

app.use('/', api)
// app.use(app.router);
// api.initialize(app);

module.exports = app