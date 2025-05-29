const router = require("express").Router();
const User = require("../models/user");
const Stationery = require("../models/stationery");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");

//add items
router.post("/add-item", authenticateToken, async (req,res)=>{
    const {url, title, price, desc} = req.body;
    try{
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role!="admin"){
            return res.status(400).json({message: "Admin can only add the items."});
        }
        const item = new Stationery({
            url: url,
            title: title,
            price: price,
            desc: desc
        });
        await item.save();
        return res.status(200).json({message: "item saved added successfully"});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
});

router.put("/update-item", authenticateToken, async (req,res)=>{
    const {url, title, price, desc} = req.body;
    try{
        const {itemid, id} = req.headers;
        const user = await User.findById(id);
        if(user.role!="admin"){
            return res.status(400).json({message: "Admin can only add the items."});
        }
        await Stationery.findByIdAndUpdate(itemid, {
            url: url,
            title: title,
            price: price,
            desc: desc
        });
        return res.status(200).json({message: "Item updated successfully"});
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.delete("/delete-item", authenticateToken, async (req,res)=>{
    try{
        const {itemid, id} = req.headers;
        const user = await User.findById(id);
        if(user.role!="admin"){
            return res.status(400).json({message: "Admin can only add the items."});
        }
        await Stationery.findByIdAndDelete(itemid);
        return res.send(200).json({message: "Item deleted successfully"});

    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
});

router.get("/get-all-items", async (req,res)=>{
    try{
        const items = await Stationery.find().sort({createdAt:-1});
        return res.json({status: "Success", data:items});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.get("/get-recent-items", async (req,res)=>{
    try{
        const items = await Stationery.find().sort({createdAt:-1}).limit(4);
        return res.json({status: "Success", data:items});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

router.get("/get-item-by-id/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        const items = await Stationery.findById(id);
        return res.json({status: "Success", data:items});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;