const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

//add item to fav
router.put("/add-item-to-favourites", authenticateToken, async (req,res)=>{
    try{
        const {itemid, id} = req.headers;
        const userData = await User.findById(id);
        const isItemFavourite = userData.favourites.includes(itemid);
        if(isItemFavourite){
            return res.status(200).json({message: "Item is already in favourites"});
        }
        await User.findByIdAndUpdate(id, {$push: {favourites: itemid}});
        return res.status(200).json({message: "Item added to favourites"});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
});

//delete item to fav
router.delete("/delete-item-from-favourites", authenticateToken, async (req,res)=>{
    try{
        const {itemid, id} = req.headers;
        const userData = await User.findById(id);
        const isItemFavourite = userData.favourites.includes(itemid);
        if(isItemFavourite){
            await User.findByIdAndUpdate(id, {$pull: {favourites: itemid}});
        }
        
        return res.status(200).json({message: "Item removed from favourites"});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
});

//get favourite items of a user
router.get("/get-favourites-items", authenticateToken, async (req,res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteItems = userData.favourites;
        return res.json({status: "Success", data:favouriteItems});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;