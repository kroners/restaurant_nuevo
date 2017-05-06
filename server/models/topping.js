'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = function (mongoose) {
    var toppingSchema = new mongoose.Schema({
        nombre: String,
        ingrediente: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingrediente' },
        cantidad: Number,
        precio: Number
    });

    return mongoose.model('Topping', toppingSchema);
}

// const ToppingSchema = Schema({
//         nombre: String,
//         ingrediente: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingrediente' },
//         cantidad: Number,
//         precio: Number
//     });


// module.exports = mongoose.model('Topping', ToppingSchema)