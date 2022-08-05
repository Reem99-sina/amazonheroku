import express from 'express'
import productsmodel from '../models/products.js'
import data from '../data.js'
import usersmodel from '../models/user.model.js'
const userrouter = express.Router()
userrouter.get("/", async (req, res) => {
    await productsmodel.remove({})
    const createdProduct = await productsmodel.insertMany(data.products)
    await usersmodel.remove({})
    const createdUser = await usersmodel.insertMany(data.users)
    res.json({ createdUser, createdProduct })
})
export default userrouter