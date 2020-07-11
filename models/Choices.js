const mongoose = require("mongoose");
const { Schema } = mongoose;

const choicesSchema = new Schema({
  answer: String,
  amount: { type: Number, default: 0 },
});

module.exports = choicesSchema;
