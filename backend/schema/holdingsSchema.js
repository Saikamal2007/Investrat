const { Schema } = require("mongoose");

const holdingsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true, index: true },
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day:String  
});

module.exports=holdingsSchema;