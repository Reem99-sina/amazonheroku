import express from 'express'
import data from './data.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userrouter from './routers/sendRouter.js'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/users.router.js'
import orderRouter from './routers/order.router.js'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/api/keys/paypal", (req, res) => {
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
let interval;
const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};
io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});
mongoose.connect(process.env.MONGODB_URL).then(() => { console.log('connect done') }).catch((error) => { console.log(error) })
app.listen(process.env.PORT, () => {
    console.log("done")
})