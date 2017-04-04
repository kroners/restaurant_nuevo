'use strict'

const Ingredient = require('mongoose').model('Ingredient');

var crearIngredientes = function(req, res) {
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

module.exports = {
	crearIngredientes
}