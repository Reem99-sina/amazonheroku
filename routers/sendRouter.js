const express = require('express')
const data = require('../data.js')
const userSend = require("../services/user.service.js")
const userrouter = express.Router()
userrouter.get("/", userSend.sendUser)
module.exports =  userrouter 