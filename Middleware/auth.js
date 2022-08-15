const jwt = require("jsonwebtoken")
const usersmodel = require("../models/user.model.js")

module.exports.isAuth = () => {
    return async(req, res, next) => {
        try {
            const authorization = req.headers['authorization']
            if (!authorization.startsWith(`${process.env.Bearer} `)) {
                res.status(400).json({ message: "in valid header token" })
            } else {
                const token = headerToken.split(" ")[1]
                if (!token) {
                    res.status(400).json({ message: "no token there" })
                } else {
                    const decoded = jwt.verify(token, process.env.jwtTokn)
                    if (!decoded) {
                        res.status(400).json({ message: "in valid token" })
                    } else {
                        const user = await usersmodel.findById(decoded.id)
                        if (!user) {
                            res.status(400).json({ message: "no user fonud" })
                        } else {
                            if (user) {
                                req.user = user
                                next()
                            } else {
                                res.status(400).json({ message: "no role user" })
                            }
                        }
                    }
                }
            }
        } catch (error) {
            res.status(500).json({ message: "error catch ", error })

        }
    }
}
