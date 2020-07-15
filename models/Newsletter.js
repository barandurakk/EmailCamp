const mongoose = require("mongoose");

const { Schema } = mongoose;

const RecipientSchema = require("./Recipient");

const newsletterSchema = new Schema({
  title: String,
  body: String,
  subject: String,
  from: String,
  recipients: [RecipientSchema], //Array of sub document
  _user: { type: Schema.Types.ObjectId, ref: "User" }, //user relationship
  dateSent: Date,
});

mongoose.model("newsletters", newsletterSchema);
