const express = require('express');
const userrouter = require('./routers/sendRouter.js');
const productRouter = require('./routers/productRouter.js');
const userRouter = require('./routers/users.router.js');
const orderRouter = require('./routers/order.router.js');
const cors = require('cors');
const { connectdb } = require('./connectdb.js');
require('dotenv').config({ path: '.env' });
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/api/v1/keys/paypal', function (req, res) {
    res.send("AR4PN1vfZND52hBGGASmbDQboPGSKtbV7JuurGM2HRCVgYzGJ0AFBZ5XLo5zURAeEe4Xa94spefZb7Y9" || '');
});
app.use('/api/v1/products', productRouter);
app.use('/api/v1/product', userrouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
const server = app.listen(4300, () => {
    console.log(`server is runnin on port`);
});
const io = require('socket.io')(server, {
    cors: '*'
});

io.on('connection', socket => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
connectdb();

