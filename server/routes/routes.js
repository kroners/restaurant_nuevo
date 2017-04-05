'use strict'

const express = require('express')
const api = express.Router()

// variable para ingresar los middleware usados
// isLoggedInMiddleware servira para validar que el usuario se encuentre con sesion iniciada
const middleWr = require('../middlewares/middleware')

// conexion con el User Controller y rutas para usuario
const UserCntrl = require('../controllers/user')

api.get('/user', UserCntrl.getUsers)
api.get('/user/:userId', UserCntrl.getUser)
api.post('/user', UserCntrl.createUser)
api.put('/user/:userId', middleWr.isLoggedInMiddleware, UserCntrl.updateUser)
api.delete('/user/:userId', middleWr.isLoggedInMiddleware, UserCntrl.deleteUser)

// rutas para ingrediente
const IngredientCntrl = require('../controllers/ingredient')

api.get('/ingredient', IngredientCntrl.getIngredients)
api.get('/ingredient/:ingredientId', IngredientCntrl.getIngredient)
api.post('/ingredient', IngredientCntrl.crearIngrediente)
api.put('/ingredient/:ingredientId', IngredientCntrl.actualizarIngrediente)
api.delete('/ingredient/:ingredientId', IngredientCntrl.deleteIngredient)

// rutas para topping
const ToppingCntrl = require('../controllers/topping')

api.get('/topping', ToppingCntrl.getToppings)
api.get('/topping/:toppingId', ToppingCntrl.getTopping)
api.post('/topping', ToppingCntrl.saveTopping)
api.put('/topping/:toppingId', ToppingCntrl.updateTopping)
api.delete('/topping/:toppingId', ToppingCntrl.deleteTopping)

// rutas para platos
const DishCntrl = require('../controllers/dish')

api.get('/dish', DishCntrl.getDishes)
api.get('/dish/:dishId', DishCntrl.getDish)
api.post('/dish', DishCntrl.saveDish)
api.put('/dish/:dishId', DishCntrl.updateDish)
api.delete('/dish/:dishId', DishCntrl.deleteDish)

// rutas para pedidos
const OrderCntrl = require('../controllers/order')

api.get('/ingredient', OrderCntrl.getPedidos)
api.get('/ingredient/:ingredientId', OrderCntrl.getPedidoById)
api.post('/ingredient', OrderCntrl.crearPedido)
api.put('/ingredient/:ingredientId', OrderCntrl.actualizarPedido)
api.delete('/ingredient/:ingredientId', OrderCntrl.deletePedido)

// rutas para autenticacion y registro de usuario
const passport = require('../config/authenticate')

api.get('/profile', middleWr.isLoggedInMiddleware, function(req, res){
    res.redirect('/');
})

api.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return next(err);
        }
        req.logIn(user, function(err) {
            return res.json(user);
        });
    })(req, res, next);
});

api.get('/logout', function(req, res){
    req.logout();
    res.send('Logout Ok');
});
