'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DishSchema = Schema({
    name: String, 
    description: String,
    picture: String, 
    price: { type: Number, default: 0 },
    ingredients: [{
        ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
        quantity: Number
    }],
})

module.exports = mongoose.model('Dish', DishSchema)