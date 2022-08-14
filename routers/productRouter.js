const express = require('express')
const productsmodel = require('../models/products.js')
const usersmodel = require('../models/user.model.js')
const productFunction = require("../services/product.service.js")
const productRouter = express.Router()
productRouter.get("/", productFunction.getProduct)
productRouter.get("/slug/:slug", productFunction.slugProduct)
productRouter.get("/:id", productFunction.idProduct)
module.exports = {productRouter}