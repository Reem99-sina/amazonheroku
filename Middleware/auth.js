const jwt = require("jsonwebtoken")

 const isAuth = async (req, res, next) => {
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
}
module.exports=isAuth