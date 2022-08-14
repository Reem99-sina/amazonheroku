const express = require('express')
// const expressAsyncHandler = require('express-async-handler')
const { isAuth } = require('../Middleware/auth.js')
// const orderModel = require('../models/order.model.js')
const orderFunction = require("../services/order.service.js")
const orderRouter = express.Router();
orderRouter.post('/create', isAuth, orderFunction.createOrder)
orderRouter.get('/mine', isAuth, orderFunction.allOrder)
orderRouter.get('/:id', isAuth, orderFunction.idOrder
);
orderRouter.put('/:id/pay', isAuth, orderFunction.payorder)
module.exports = { orderRouter }