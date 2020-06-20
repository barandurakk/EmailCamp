//Heroku'ya json credentialleri eklemek için dosya oluşturuyoruz.
var fs = require("fs");
fs.writeFile(process.env.GCS_KEY_FILE, process.env.GCS_KEY, (err) => {});
