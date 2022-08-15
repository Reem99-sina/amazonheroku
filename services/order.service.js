const orderModel = require("../models/order.model.js");

const createOrder = async (req, res) => {
    const newOrder = new orderModel({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user.id,
    });
    const order = await newOrder.save();
    if (order) {
        console.log(order)
        res.status(201).send({ order });
    } else {
        res.status(401).send({ message: 'error order', error: order.error });
    }

}
const allOrder = async (req, res) => {
    const orders = await orderModel.find({ user: req.user._id })
    if (orders) {
        res.status(201).send({ message: "New order Created", orders })
    } else {
        res.status(401).send({ message: "no order found" })
    }
}
const idOrder = async (req, res) => {
    const order = await orderModel.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }
}
const payorder = async (req, res) => {
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
}
module.exports = { createOrder, allOrder, idOrder, payorder }