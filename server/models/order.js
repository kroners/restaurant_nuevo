'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = Schema({
        order: [{
            dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
            quantity: Number,
            toppings:[{
                topping:{ type: mongoose.Schema.Types.ObjectId, ref: 'Topping' },
                quantity:Number
            }]
        }],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        payment: { type: String, default: 'Efectivo' },
        state: {
            type: String,
            default: "pedido"
        },
        price:Number
    }, {
            timestamps: true
        })

module.exports = mongoose.model('Order', OrderSchema)