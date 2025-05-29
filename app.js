const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./connection/connect");
const user = require("./routes/user");
const stationery = require("./routes/stationery");
const favourites = require("./routes/favourite");
const cart = require("./routes/cart");
const orders = require("./routes/order");

app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1", user);
app.use("/api/v1", stationery);
app.use("/api/v1", favourites);
app.use("/api/v1", cart);
app.use("/api/v1", orders);

app.get("/", (req,res)=>{
    res.send("Hello");
})

//creating port
app.listen(process.env.PORT, ()=>{
    console.log("Server Started");
});