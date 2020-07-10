const sgMail = require("@sendgrid/mail");

const helpers = require("@sendgrid/helpers");
const keys = require("../config/keys");

class Mailer extends helpers.classes.Mail {
  constructor({ subject, recipients, from }, content) {
    super();

    this.setFrom("barandurak07@gmail.com"); // uses the EmailAddress.create method
    this.setSubject(subject);
    this.addHtmlContent(content); // same as addContent, but more specific for HTML
    this.setReplyTo(from);

    this.recipients = recipients.map(({ email }) => helpers.classes.EmailAddress.create(email));

    this.setTrackingSettings({
      clickTracking: { enable: true, enableText: true },
    });

    this.addTo(this.recipients); // This uses the personalization method in the background
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  async send() {
    sgMail.setApiKey(keys.sendGridKey);

    return await sgMail.send(this); // attach the current instance to be send out with SendGrid
  }
}

module.exports = Mailer;
