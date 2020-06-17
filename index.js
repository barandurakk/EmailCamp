const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const multer = require("multer");
require("./models/User");
require("./services/passport");

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    //max 5 mb
    fileSize: 5 * 1024 * 1024,
  },
});

mongoose.connect(keys.mongoURI); //mongoDB'ye baglan

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 gün sonra cookie expire olacak sekilde ayarladık.
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize()); //req.user kullanabilmemiz için middleware
app.use(passport.session()); //req.user kullanabilmemiz için middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multerMid.single("file")); //tek resim upload için middleware

require("./routes/auth")(app);
require("./routes/billingRoutes")(app);
require("./routes/user")(app);

//bu logic temel olarak productionda çalışan express serverimizin cevap olarak client serverimizi (react app) tanıması ve cevap gönderebilmesi için.
if (process.env.NODE_ENV === "production") {
  //Express main.js ve main.css gibi dosyalara ulaşıp cevap verebilsin diye.
  app.use(express.static("client/build"));

  //Express gelen route'u tanımazsa index.html sayfasını cevap olarak göndersin diye.
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT); //http://localhost:5000/
