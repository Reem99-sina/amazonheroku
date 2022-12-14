const mongoose = require("mongoose");
module.exports.connectdb = () => {
    return mongoose.connect('mongodb+srv://amazon:reemebrahim99@cluster0.8iyta.mongodb.net').then(() => {
        console.log("done connect")
    }).catch((error) => {
        console.log("error connect", error)

    })
}