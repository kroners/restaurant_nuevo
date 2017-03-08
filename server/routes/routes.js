'use strict'

const express = require('express')
const api = express.Router()

// variable para ingresar los middleware usados
const middleWr = require('../middlewares/middleware')

// rutas para usuario
const UserCntrl = require('../controllers/user')

api.get('/user', UserCntrl.getUsers)
api.get('/user/:userId', UserCntrl.getUser)
api.post('/user', UserCntrl.saveUser)
api.put('/user/:userId', UserCntrl.updateUser)
api.delete('/user/:userId', UserCntrl.deleteUser)

// rutas para ingrediente
const IngredientCntrl = require('../controllers/ingredient')

api.get('/ingredient', IngredientCntrl.getIngredients)
api.get('/ingredient/:ingredientId', IngredientCntrl.getIngredient)
api.post('/ingredient', IngredientCntrl.saveIngredient)
api.put('/ingredient/:ingredientId', IngredientCntrl.updateIngredient)
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

api.get('/ingredient', OrderCntrl.getOrders)
api.get('/ingredient/:ingredientId', OrderCntrl.getOrder)
api.post('/ingredient', OrderCntrl.saveOrder)
api.put('/ingredient/:ingredientId', OrderCntrl.updateOrder)
api.delete('/ingredient/:ingredientId', OrderCntrl.deleteOrder)

// rutas para autenticacion y registro de usuario
const passport = require('passport')

api.get('/profile', passport.authenticationMiddleware(), )





