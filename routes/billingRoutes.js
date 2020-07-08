const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      description: "1 kredi için 1 USD",
      source: req.body.token.id,
    });

    req.user.credits += req.body.amount / 100;
    const user = await req.user.save(); //5 kredi eklenmiş şekilde database'e save'liyoruz. Bu bir promise

    res.send(user);
  });
};
