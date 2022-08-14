const express = require('express')
const { isAuth } = require('../Middleware/auth.js')
const userFunction = require("../services/user.service.js")
const userRouter = express.Router()
userRouter.post('/', userFunction.sendUser)
userRouter.post('/signin', userFunction.signin)
userRouter.post('/signup', userFunction.signup)
userRouter.put('/profile', isAuth, userFunction.profileUser)
module.exports = userRouter 