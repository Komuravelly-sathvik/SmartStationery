const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");

//sign up
router.post("/signup", async(req, res)=>{
    try{
        const {username, email, password, address} = req.body;

        //check username length more than 4
        if(username.length < 4){
            return res.status(400).json({message: "Username length should be greater than 3"});
        }

        //check user does user already exists
        const existingUser = await User.findOne({username: username});
        if(existingUser){
            return res.status(400).json({message: "Username already exists"});
        }

        //check email does user already exists
        const existingEmail = await User.findOne({email: email});
        if(existingEmail){
            return res.status(400).json({message: "Email already exists"});
        }

        //check password length more that 6
        if(password.length <6){
            return res.status(400).json({message: "Password length should be greater 5"});
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address
        });

        await newUser.save();
        return res.status(200).json({message: "Signup successful"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

//sign-in
router.post("/signIn", async(req,res)=>{
    try{
        const {username, password} = req.body;

        const existingUser = await User.findOne({username});
        if(!existingUser){
            res.status(400).json({message: "Invalid Credentials"});
        }

        await bcrypt.compare(password, existingUser.password, (err, data)=>{
            if(data){
                const authClaims = [
                    {name: existingUser.username},
                     {role: existingUser.role}
                ];
                const token = jwt.sign({authClaims}, "stationery-project", {expiresIn: "30d"});
                res.status(200).json({id: existingUser._id, role: existingUser.role, token: token});
            }else{
                res.status(400).json({message: "Invalid Credentials"});
            }
        });
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
});

//get-user-info
router.get("/get-user-info", authenticateToken, async (req,res)=>{
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
});

//update address
router.put("/update-address", authenticateToken, async (req,res)=>{
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address: address});
        return res.status(200).json({message: "Address updated successfully"});
    }catch(error){
        res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;