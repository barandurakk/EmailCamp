import React from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";

import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

import CSVReader from "react-csv-reader";

class FormSurvey extends React.Component {
  handleCsvFile(data) {
    let recipientTempList = [];
    for (let x = 0; x < data.length; x++) {
      for (let y = 0; y < data[x].length; y++) {
        recipientTempList.push(data[x][y]);
      }
    }

    let recipientTempString = "";
    recipientTempList
      .filter((email) => email.length !== 0)
      .map((email) => (recipientTempString += `${email},`));

    //change the recipient value
    this.props.change("recipients", recipientTempString);
  }

  renderFields() {
    return (
      <div>
        <Field type="text" name="title" label="Anket Başlığı" component={SurveyField} />
        <Field type="text" name="subject" label="Konu" component={SurveyField} />
        <Field type="text" name="body" label="Email İçeriği" component={SurveyField} />
        <Field
          type="text"
          name="recipients"
          label="Alıcı Listesi (Virgülle Ayrılmış)"
          component={SurveyField}
        />
        <CSVReader onFileLoaded={(data) => this.handleCsvFile(data)} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderFields()}
          <Link to="/panel">İptal</Link>
          <button type="submit">Sonraki</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  //redux-form validate
  const errors = {};

  //title
  if (!values.title) {
    errors.title = "Bir başlık girmelisiniz!";
  } else if (values.title.length > 40) {
    errors.title = "Başlık 50 karakterden fazla olamaz!";
  }

  //subject
  if (!values.subject) {
    errors.subject = "Bir konu girmelisiniz";
  } else if (values.title.length > 60) {
    errors.title = "Başlık 60 karakterden fazla olamaz!";
  }

  //body
  if (!values.body) {
    errors.body = "Mail içeriği girmelisiniz!";
  } else if (values.body.length > 10000) {
    errors.body = "Mail içeriği 10000 karakterden fazla olamaz!";
  }

  //Recipients
  errors.recipients = validateEmails(values.recipients || "");
  if (!values.recipients) {
    errors.recipients = "Alıcı girmelisiniz!";
  }

  return errors;
}

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  enableReinitialize: true,
  destroyOnUnmount: false,
})(FormSurvey);
