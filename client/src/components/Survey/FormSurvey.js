import React from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";

import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

import CSVReader from "react-csv-reader";

//material ui
import withStyles from "@material-ui/styles/withStyles";
import { Button, Typography } from "@material-ui/core";

const styles = {
  formSurveyContainer: {
    width: "70%",
    margin: "auto",
  },
  formActionWrapper: {
    position: "relative",
    width: "100%",
    top: "0px",
    height: "50px",
    backgroundColor: "#80d8ff",
    display: "flex",
    alignContent: "middle",
    justifyContent: "space-between",
    marginTop: 25,
  },
  actionButtons: {
    width: "150px",
  },
};

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
        <Field
          type="text"
          name="title"
          label="Anket Başlığı"
          component={SurveyField}
          variant="outlined"
          multiline={false}
        />
        <Field
          type="text"
          name="from"
          label="Kimden"
          component={SurveyField}
          variant="outlined"
          multiline={false}
        />
        <Field
          type="text"
          name="subject"
          label="Konu"
          component={SurveyField}
          variant="outlined"
          multiline={false}
        />
        <Field
          type="text"
          name="body"
          label="Email Gövdesi"
          component={SurveyField}
          variant="outlined"
          multiline={true}
          rows={5}
        />

        <Field
          type="text"
          name="choices"
          label="Cevap Seçenekleri (Virgülle Ayrılmış)"
          component={SurveyField}
          multiline={true}
          variant="outlined"
        />

        <Field
          type="text"
          name="recipients"
          label="Alıcı Listesi (Virgülle Ayrılmış)"
          component={SurveyField}
          multiline={true}
          variant="outlined"
        />
        <Typography variant="h6" color="primary">
          .csv formatında alıcı listesi yükleyebilirsiniz.
        </Typography>
        <CSVReader onFileLoaded={(data) => this.handleCsvFile(data)} />
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.formSurveyContainer}>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          <div className={classes.formActionWrapper}>
            <Button
              className={classes.actionButtons}
              variant="contained"
              color="primary"
              component={Link}
              to="/panel"
            >
              İptal
            </Button>
            <Button
              className={classes.actionButtons}
              type="submit"
              variant="contained"
              color="primary"
            >
              Önizle
            </Button>
          </div>
          {this.renderFields()}
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
  } else if (values.subject.length > 60) {
    errors.subject = "Başlık 60 karakterden fazla olamaz!";
  }

  //body
  if (!values.body) {
    errors.body = "Mail içeriği girmelisiniz!";
  } else if (values.body.length > 10000) {
    errors.body = "Mail içeriği 10000 karakterden fazla olamaz!";
  }

  //from
  errors.from = validateEmails(values.from || "");
  if (!values.from) {
    errors.from = "Kimden kısmı boş olamaz!";
  }

  //Choices

  if (!values.choices) {
    errors.choices = "Alıcı girmelisiniz!";
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
})(withStyles(styles)(FormSurvey));
