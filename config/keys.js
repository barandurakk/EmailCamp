// production damıyız developmenttamıyız secmek icin
if (process.env.NODE_ENV === "production") {
  //productiondayız prod key'i returnle
  module.exports = require("./prod");
} else {
  //developmenttayız dev key'i returnle
  module.exports = require("./dev");
}

//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 - Send Grid
