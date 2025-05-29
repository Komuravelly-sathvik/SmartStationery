const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    avator:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/036/885/313/non_2x/blue-profile-icon-free-png.png"
    },
    role:{
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "stationery"
        }
    ],
    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "stationery"
        }
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "order"
        }
    ]
},
{timestamps: true}
);

module.exports = mongoose.model("user", user)