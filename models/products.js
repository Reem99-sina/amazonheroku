const mongoose =require("mongoose");
const productschema =  mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    countInStock: { type: String, required: true },
    rating: { type: String, required: true },
    numReviews: { type: String, required: true },

}, {
    timestamps: true
})
const productsmodel = mongoose.model('product', productschema)
module.exports= productsmodel 