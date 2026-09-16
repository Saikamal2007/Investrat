const { model } = require("mongoose");

const positionsSchema = require("../schema/positionsSchema.js");

const Positions = model("position", positionsSchema);

module.exports = Positions;
