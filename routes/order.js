const router = require("express").Router();
const Stationery = require("../models/stationery");
const Order = require("../models/orders");
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

//place order
router.post("/place-order", authenticateToken, async (req,res)=>{
    try{
        const {id} = req.headers;
        const {order} = req.body;
        for(const orderData of order){
            const newOrder = new Order({user: id, stationery:orderData._id});
            const orderDataFromDb = await newOrder.save();

            await User.findByIdAndUpdate(id, {$push: {orders:orderDataFromDb._id}});

            await User.findByIdAndUpdate(id, {$pull: {cart: orderData._id}});
        }
        return res.json({
            status: "Success",
            message: "Order placed successfully"
        })
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

//get orders
router.get("/get-order-history", authenticateToken, async (req,res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {path: "stationery"}
        });
        const ordersData = userData.orders.reverse();
        return res.json({status: "Success", data: ordersData});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

//get-all-orders ---admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find().populate({path: "stationery"})
        .populate ({path: "user"}).sort({ createdAt: -1 });
        return res.json({status: "Success", data:userData});
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message:"An error occurred" });
    }
});

//update order --admin
router.put("/update-status/:id", authenticateToken, async (req, res) =>{
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({status: "Success", message: "Status Updated Successfully"});
    } catch (error) {
        console. log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

module.exports = router;