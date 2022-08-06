import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { isAuth } from '../Middleware/auth.js'
import orderModel from '../models/order.model.js'
const orderRouter = express.Router()
orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    console.log(typeof req.body.orderItems)
    const resultArray = req.body.orderItems.map((x) => ({ ...x, product: x._id }))
    const Neworder = new orderModel({
        orderItems: resultArray,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user.id
    })
    const order = await Neworder.save()
    if (order) {
        res.status(201).send({ message: "New order Created", order })

    } else {
        res.status(401).send({ message: "no order add " })

    }

}))
orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await orderModel.find({ user: req.user.id })
    if (orders) {
        res.status(201).send({ message: "New order Created", orders })
    } else {
        res.status(401).send({ message: "no order found" })
    }
}))
orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await orderModel.findById(req.params.id)
    if (order) {
        res.status(201).send({ message: "New order Created", order })

    } else {
        res.status(401).send({ message: "no order found" })

    }
}))
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await orderModel.findById(req.params.id)
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updateOrder = await order.save()
        res.status(201).send({ message: "order paid", updateOrder })

    } else {
        res.status(401).send({ message: "no order found" })

    }
}))
export default orderRouter