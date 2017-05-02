'use strict'

const mongoose = require('mongoose')
const app = require('./server/config/app')
const config = require('./server/config/config')

mongoose.connect(config.db, (err, res) => {
	if (err) {
		console.log('Hubo error al conectar a la BD.')
	}
	
	console.log('Conexion establecida')
	
	app.listen(config.port, () => {
		console.log('API ejecutando')
	})
})

