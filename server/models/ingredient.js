'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientSchema = new Schema({
		name: String,
		picture: String,
		quantity: Number,
		calories: Number
	},
	{
		timestamps: true
	})

module.exports = mongoose.model('Ingredient', IngredientSchema)
