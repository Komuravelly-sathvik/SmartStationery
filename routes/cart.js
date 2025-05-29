const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

//put to cart
router.put("/add-to-cart", authenticateToken, async (req,res)=>{
    try{
        const {itemid, id} = req.headers;
        const userData = await User.findById(id);
        const isItemincart = userData.cart.includes(itemid);
        if(isItemincart){
            return res.json({status: "Success", message: "Item is alredy in cart"});
        }
        await User.findByIdAndUpdate(id, {
            $push: {cart: itemid}
        });
        return res.json({
            status: "Success",
            message: "Item added to cart"
        });
        
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        const user = await User.findById(id).populate("cart"); // populate item details
        if (!user) {
            return res.status(404).json({ status: "Failed", message: "User not found" });
        }

        return res.json({
            status: "Success",
            message: "Cart fetched successfully",
            data: user.cart
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/remove-from-cart/:itemid", authenticateToken, async (req,res)=>{
    try{
        const {itemid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id, {
            $pull: {cart:itemid}
        });
        return res.json({
            status: "Success",
            message: "Book removed from cart"
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router;