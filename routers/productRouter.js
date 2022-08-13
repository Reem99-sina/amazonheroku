const express = require('express')
const productsmodel = require('../models/products.js')
const usersmodel = require('../models/user.model.js')
const productRouter = express.Router()
productRouter.get("/", async (req, res) => {
    const product = await productsmodel.find()
    const users = await usersmodel.find()
    res.json({ product, users })
})
productRouter.get("/slug/:slug", async (req, res) => {
    const product = await productsmodel.findOne({ slug: req.params.slug })
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: "product not found" })
    }
})
productRouter.get("/:id", async (req, res) => {
    const product = await productsmodel.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: "product not found" })
    }
})
module.exports= productRouter