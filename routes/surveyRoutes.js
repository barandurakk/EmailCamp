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

  //get a Survey
  app.get("/api/surveys/:surveyId", requireLogin, async (req, res) => {
    const survey = await Survey.find({ _user: req.user.id, _id: req.params.surveyId });

    if (survey) {
      res.send(survey);
    } else {
      res
        .status(404)
        .send({ error: "Olmayan veya sahip olmadığınız bir ankete erişmeye çalışıyorsunuz." });
    }
  });

  //delete a Survey
  app.get("/api/surveys/:surveyId/delete", requireLogin, async (req, res) => {
    Survey.findOneAndDelete({
      _user: req.user.id,
      _id: req.params.surveyId,
    }).then((result) => {
      if (result) {
        res.send({ message: "Anket başarıyla silindi." });
      } else {
        res.status(404).send({ error: "Varolmayan veya sizin olmayan bir anketi silemezsiniz!" });
      }
    });
  });

  //Thank you screen
  app.get("/api/surveys/:surveyId/:answer", (req, res) => {
    res.send("Geri dönüşünüz için teşekkürler!");
  });

  //answer handle
  app.post("/api/surveys/webhooks", (req, res) => {
    console.log("---START of HOOK--");

    const p = new Path("/api/surveys/:surveyId/:answerId"); //path-parser kütüphanesi ile path name'i koddaki layout ile extract ediyoruz

    _.chain(req.body)
      .map((event) => {
        const pathname = new URL(event.url).pathname; //gelen url'in pathname'i
        const eventObject = p.test(pathname);

        if (eventObject) {
          return {
            email: event.email,
            surveyId: eventObject.surveyId,
            answerId: eventObject.answerId,
          };
        }
      })
      .compact() //lodash undefined olan eventleri siliyor.
      .uniqBy("email", "surveyId") //lodash email ve survey Id aynı olan elementleri siliyor.
      .each(async (event) => {
        Survey.updateOne(
          {
            _id: event.surveyId,

            recipients: {
              $elemMatch: { email: event.email, responded: false },
            },
          },
          {
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        )
          .exec()
          .then((result) => {
            const { nModified } = result;
            if (nModified >= 1) {
              Survey.updateOne(
                {
                  _id: event.surveyId,
                  "choices._id": event.answerId,
                },
                {
                  $inc: { "choices.$.amount": 1 },
                }
              ).exec();
            }
          });
      })
      .value();
    console.log("---END of HOOK--");
    res.send({});
  });

  //post Survey to sendgrid and save survey to database
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients, from, choices, drafted } = req.body;

    console.log(from);

    const survey = new Survey({
      title,
      subject,
      from,
      body,
      recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
      choices: choices.split(",").map((choice) => ({ answer: choice })),
      _user: req.user.id,
      dateSent: Date.now(),
      drafted,
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
