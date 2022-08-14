const express = require('express')
const data = require('./data.js')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userrouter = require('./routers/sendRouter.js')
const productRouter = require('./routers/productRouter.js')
const userRouter = require('./routers/users.router.js')
const orderRouter = require('./routers/order.router.js')
const cors = require('cors')
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/api/keys/paypal", function (req, res) {
    res.send(process.env.PAYPAL_CLIENT_ID || "")
})
app.use("/api/products", productRouter)
app.use("/api/product", userrouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)
const server = app.listen(process.env.PORT, () => {
    console.log(`server is runnin on port`);
})
const io = require("socket.io")(server, {
    cors: "*"
})

io.emit("connection", (socket) => {
    console.log("New client connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");

    });
});
mongoose.connect(process.env.MONGODB_URL).then(() => { console.log('connect done') }).catch((error) => { console.log(error) })
app.listen(process.env.PORT, () => {
    console.log("done")
})