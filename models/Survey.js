const mongoose = require("mongoose");

const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");
const ChoicesSchema = require("./Choices");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  from: String,
  recipients: [RecipientSchema], //Array of sub document
  choices: [ChoicesSchema],
  _user: { type: Schema.Types.ObjectId, ref: "User" }, //user relationship
  dateSent: Date,
  lastResponded: Date,
  drafted: { type: Boolean, default: false },
});

mongoose.model("surveys", surveySchema);
