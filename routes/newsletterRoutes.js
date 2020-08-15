const mongoose = require("mongoose");
const Newsletter = mongoose.model("newsletters");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const { result } = require("lodash");

module.exports = (app) => {
  //get newsletters
  app.get("/api/newsletter", requireLogin, async (req, res) => {
    const newsletters = await Newsletter.find({ _user: req.user.id }).select({ recipients: false });

    res.send(newsletters);
  });

  //get A newsletter
  app.get("/api/newsletter/:newsletterId", requireLogin, async (req, res) => {
    const newsletter = await Newsletter.find({ _user: req.user.id, _id: req.params.newsletterId });

    res.send(newsletter);
  });

  //delete a newsletter
  app.get("/api/newsletter/:newsletterId/delete", requireLogin, async (req, res) => {
    Newsletter.findOneAndDelete({
      _user: req.user.id,
      _id: req.params.newsletterId,
    }).then((result) => {
      if (result) {
        res.send({ message: "Bülten başarıyla silindi!" });
      } else {
        res.status(404).send({ error: "Silmeye çalıştıgınız bülten varolmamış veya sizin değil!" });
      }
    });
  });

  //post Newsletter to sendgrid and save survey to database
  app.post("/api/newsletter", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients, from } = req.body;

    const newsletter = new Newsletter({
      title,
      subject,
      from,
      body,
      recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    //Send Email
    const mailer = new Mailer(newsletter, body);

    try {
      await mailer.send();
      await newsletter.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
