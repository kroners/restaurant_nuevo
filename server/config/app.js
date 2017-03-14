'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const app = express()
const api = require('../routes/routes')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
	secret: 'mysecretkeyrestaurantapp',
	resave: true, // al igual que la opcion inferior, para evitar que se creen sesiones no deseadas
	saveUninitialized: false, // para evitar que se generen sesiones no deseadas
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	duration: 30 * 60 * 1000,
	activeDuration: 50 * 60 * 1000,
	cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))

// uso de passport - Inicializando passport
app.use(passport.initialize())  
app.use(passport.session())  

//uso de cookieParser
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../../client')))

app.use('/', api)

module.exports = app