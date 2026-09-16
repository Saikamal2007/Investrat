const { model } = require("mongoose");

const holdingsSchema = require("../schema/holdingsSchema.js");

const Holdings = new model("holding", holdingsSchema);

module.exports = Holdings;