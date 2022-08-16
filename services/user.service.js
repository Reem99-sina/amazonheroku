const { data } = require("../data.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const productsmodel = require("../models/products.js")
const usersmodel = require("../models/user.model.js")

const sendUser = async (req, res) => {
    const createdProduct = await productsmodel.insertMany(data.products)
    const createdUser = await usersmodel.insertMany(data.users)
    res.json({ createdUser, createdProduct })
}
const signin = async (req, res) => {
    const user = await usersmodel.findOne({ email: req.body.email })
    if (user) {
        const match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            const userToken = jwt.sign({ id: user._id }, process.env.jwtTokn, { expiresIn: "24h" })
            res.json({ user, userToken })
        } else {
            res.status(401).json({ message: "invalid email or password" })
        }
    } else {
        res.json({ message: "not defined user" })
    }
}
const signup = async (req, res) => {
    const searchuser = await usersmodel.findOne({ email: req.body.email })
    if (searchuser) {
        console.log(searchuser)
        res.status(404).json({ error: "error existed email", searchuser })
    } else {
        const newPassword = await bcrypt.hash(req.body.password, Number(process.env.saltRound))
        const newuser = new usersmodel({
            userName: req.body.userName,
            email: req.body.email,
            password: newPassword
        })
        const user = await newuser.save()
        console.log(user)
        // const userToken = jwt.sign({ id: saveuser._id }, process.env.jwtTokn, { expiresIn: "24h" })
        res.json({ user })
    }

}
const profileUser = async (req, res) => {
    const user = await usersmodel.findById(req.user.id)
    if (user) {
        user.userName = req.body.userName || user.userName
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, Number(process.env.saltRound))
        }
        user.token = await jwt.sign({ id: user._id }, process.env.jwtTokn, { expiresIn: "24h" })
        const updateuser = await user.save()
        res.status(201).json({ message: "user updated done", updateuser })

    } else {
        res.status(401).json({ message: "no user to updated" })

    }
}
module.exports = { sendUser, signin, signup, profileUser }