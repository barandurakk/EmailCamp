const mongoose = require("mongoose");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/twoOptionSurveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });

    res.send(surveys);
  });

  //Thank you screen
  app.get("/api/surveys/:surveyId/:answer", (req, res) => {
    res.send("Geri dönüşünüz için teşekkürler!");
  });

  //answer handle
  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:answer"); //path-parser kütüphanesi ile path name'i koddaki layout ile extract ediyoruz

    _.chain(req.body)
      .map((event) => {
        const pathname = new URL(event.url).pathname; //gelen url'in pathname'i
        const eventObject = p.test(pathname);
        if (eventObject) {
          return { email: event.email, surveyId: eventObject.surveyId, answer: eventObject.answer };
        }
      })
      .compact() //lodash undefined olan eventleri siliyor.
      .uniqBy("email", "surveyId") //lodash email ve survey Id aynı olan elemenleri siliyor.
      .each((event) => {
        Survey.updateOne(
          //database güncelliyoruz
          {
            _id: event.surveyId,
            recipients: {
              $elemMatch: { email: event.email, responded: false },
            },
          },
          {
            $inc: { [event.answer]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  //post Survey to sendgrid and save survey to database
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    //Send Email
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};