const express = require('express')
// const productsmodel = require('../models/products.js')
const data = require('../data.js')
// const usersmodel = require('../models/user.model.js')
const userSend = require("../services/user.service.js")
const userrouter = express.Router()
userrouter.get("/", userSend.sendUser)
module.exports = { userrouter }