const express = require("express");

const app = express(); //creates an new express app

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

app.listen(5000); //http://localhost:5000/
