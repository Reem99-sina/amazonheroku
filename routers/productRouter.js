const express = require('express')
const productFunction = require("../services/product.service.js")
const productRouter = express.Router()
productRouter.get("/", productFunction.getProduct)
productRouter.get("/slug/:slug", productFunction.slugProduct)
productRouter.get("/:id", productFunction.idProduct)
module.exports =  productRouter 