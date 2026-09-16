const { Schema } = require("mongoose");

const ordersSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true, index: true },
    name: String,
    qty: Number,
    price: Number,
    mode: String
});

module.exports = ordersSchema;
