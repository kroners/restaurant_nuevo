'use strict'

// const Order = require('mongoose').model('Order');
const Order = require('../models/order');

var crearPedido = function(req, res) {
	var nombre = req.body.nombre;
    var calorias = req.body.calorias;
    var imagen = req.body.imagen;
    var cantidad = req.body.cantidad;

    var ingrediente = new Ingrediente({
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

var actualizarPedido = function(req, res) {
    var nombre = req.body.nombre;
    var calorias = req.body.calorias;
    var imagen = req.body.imagen;
    var cantidad = req.body.cantidad;

    var id = req.body._id;

    Ingredient.findById(id).exec(function (err, ingredient) {
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

var getPedidos = function(req, res){

    Ingredient.find({}, function (err, ingredient) {
        if (err) {
            return res.json({ message: "no hay usuarios", status: "fail", ingredients: null });
        } else {
            return res.json({ message: "OK", status: "ok", ingredients: ingredients });
        }
    });
}

var getPedidoById = function(req, res) {

    var id = req.body._id;
    Ingredient.findById(id).exec(function (err, ingredient) {
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

var deletePedido = function(req, res) {

}

module.exports = {
	crearPedido,
    actualizarPedido,
    getPedidos,
    getPedidoById,
    deletePedido
}