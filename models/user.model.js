const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true }
}, {
    timestamps: true
})
// userschema.pre("findOne", async function (next) {
//  this.password=await bcrypt.
// })
const usersmodel = mongoose.model('user', userschema)
export default usersmodel 