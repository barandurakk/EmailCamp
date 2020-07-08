const mongoose = require("mongoose");
const recipientSchema = require("./Recipient");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], //Array of sub document
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" }, //user relationship
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model("surveys", surveySchema);
