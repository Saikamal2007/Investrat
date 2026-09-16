const express = require("express");
const mongoose = require("mongoose");
const Holdings = require("./model/holdingsModel");
const Orders = require("./model/ordersModel");
const Positions = require("./model/positionsModel");
const cors=require('cors');
const bodyParser=require("body-parser");
require("dotenv").config();

const PORT=process.env.PORT || 5000;
const url=process.env.MONGO_URL;


const app=express();
app.use(cors());
app.use(bodyParser.json());

app.get("/allHoldings",async(req,res)=>{
    let allHoldings =await Holdings.find({});
    console.log("Data send");
    res.json(allHoldings);
});

app.get("/allPositions",async(req,res)=>{
    let allPositions =await Positions.find({});
    console.log("Data send");
    res.json(allPositions);
});

 app.listen(PORT,()=>{
    console.log("Server is running on port 5000");
    mongoose.connect(url);
    console.log("DB connected");
});