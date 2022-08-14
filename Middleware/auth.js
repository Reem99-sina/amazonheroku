const jwt = require("jsonwebtoken")

const isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.split(" ")[1];
            await jwt.verify(token, process.env.jwtTokn, (err, decode) => {
                if (err) {
                    res.status(401).json({ message: "invalid token", err })
                } else {
                    req.user = decode;
                    console.log(decode)
                    next()
                }
            })
        } else {
            res.status(401).json({ message: "No token " })

        }
    } catch (error) {
        res.status(500).json({ message: "error catch ", error })

    }
}
module.exports = isAuth