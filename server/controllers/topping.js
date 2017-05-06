'use strict'

// const Topping = require('mongoose').model('Topping');
const Topping = require('../models/topping');

var saveTopping = function(req, res) {
	var nombre = req.body.nombre;
    var calorias = req.body.calorias;
    var imagen = req.body.imagen;
    var cantidad = req.body.cantidad;

    var ingrediente = new Topping({
        name: nombre,
        calories: calorias,
        picture: imagen,
        quantity: cantidad
    });
    ingrediente.save(function (err, newIngrediente) {
        if (!err) {
            return res.json({ message: "OK", status: "ok", ingrediente: newIngrediente });
        } else {
            return res.json({ message: err.message, status: "fail", ingrediente: null });
        }
    });
}

var updateTopping = function(req, res) {
    var nombre = req.body.nombre;
    var calorias = req.body.calorias;
    var imagen = req.body.imagen;
    var cantidad = req.body.cantidad;

    var id = req.body._id;

    Topping.findById(id).exec(function (err, ingredient) {
        if (!err) {
            if (ingredient) {
                ingredient.name = nombre;
                ingredient.calories = calorias;
                ingredient.picture = imagen;
                ingredient.quantity = cantidad;
                ingredient.save(function (err) {
                    if (!err) {
                        res.json({
                            status: "ok",
                            ingredient: ingredient,
                            message: "ACTUALIZADO"
                        });
                    } else {
                        return res.json({ message: err.message, status: "fail", ingredient: null });
                    }
                })
            } else {
                return res.json({ message: "INGREDIENTE_NO_ENCONTRADO", status: "fail", ingredient: null });
            }
        } else {
            return res.json({ message: err.message, status: "fail", ingredient: null });
        }
    });
}

var getToppings = function(req, res){

    Topping.find({}, function (err, ingredient) {
        if (err) {
            return res.json({ message: "no hay usuarios", status: "fail", ingredients: null });
        } else {
            return res.json({ message: "OK", status: "ok", ingredients: ingredients });
        }
    });
}

var getTopping = function(req, res) {

    var id = req.body._id;
    Topping.findById(id).exec(function (err, ingredient) {
        if (!err) {
                if (ingredient) {
                    return res.json({ message: "OK", status: "ok", ingredient: ingredient });
                } else {
                        return res.json({ message: "USUARIO_NO_ENCONTRADO", status: "fail", ingredient: null });
                }
        } else {
                return res.json({ message: err.message, status: "fail", ingredient: null });
        }
    });
}

var deleteTopping = function(req, res) {

}

module.exports = {
	saveTopping,
    updateTopping,
    getToppings,
    getTopping,
    deleteTopping
}