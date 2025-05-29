const mongoose = require("mongoose");

const order = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    stationery: {
        type: mongoose.Types.ObjectId,
        ref: "stationery"
    },
    status:{
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Out for delevery", "Delivered", "Canceled"]
    }
}, {
    timestamps:true
});

module.exports = mongoose.model("order", order)