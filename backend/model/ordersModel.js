const { model } = require("mongoose");

const ordersSchema = require("../schema/ordersSchema.js");

const Orders = model("order", ordersSchema);

module.exports = Orders;
