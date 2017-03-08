'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientSchema = Schema({
		name: String,
		picture: String,
		quantity: Number
	},
	{
		timestamps: true
	})

module.exports = mongoose.model('Ingredient', IngredientSchema)