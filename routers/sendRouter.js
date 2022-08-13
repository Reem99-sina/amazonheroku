const express =require('express')
const productsmodel =require('../models/products.js')
const data =require('../data.js')
const usersmodel =require('../models/user.model.js')
const userrouter = express.Router()
userrouter.get("/", async (req, res) => {
    await productsmodel.remove({})
    const createdProduct = await productsmodel.insertMany(data.products)
    await usersmodel.remove({})
    const createdUser = await usersmodel.insertMany(data.users)
    res.json({ createdUser, createdProduct })
})
module.exports= userrouter