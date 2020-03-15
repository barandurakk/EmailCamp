const express = require("express");

const app = express(); //creates an new express app

app.get("/", (req, res) => {
  res.send({ hi: "buddy" });
});

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";
app.listen(PORT, HOST); //http://localhost:5000/
