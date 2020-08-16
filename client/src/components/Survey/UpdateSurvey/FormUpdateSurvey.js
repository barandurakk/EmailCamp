import React, { Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import validateEmails from "../../../utils/validateEmails";

import CSVReader from "react-csv-reader";

import SurveyField from "../SurveyField";

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

class FormUpdateSurvey extends React.Component {
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
    const { classes, initialValues } = this.props;
    console.log(initialValues);
    return (
      <Fragment>
        {initialValues && initialValues.drafted === true ? (
          <div className={classes.formSurveyContainer}>
            <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
              <div className={classes.formActionWrapper}>
                <Button
                  className={classes.actionButtons}
                  variant="contained"
                  color="primary"
                  onClick={this.props.onCancel}
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
        ) : (
          <div>Böyle bir survey yok veya zaten gönderilmiş!</div>
        )}
      </Fragment>
    );
  }
}

FormUpdateSurvey = reduxForm({
  form: "surveyUpdateForm",
  // resets the values every time the state changes
  // use only if you need to re-populate when the state changes
  enableReinitialize: true,
  destroyOnUnmount: false,
})(withStyles(styles)(FormUpdateSurvey));

const mapStateToProps = (state) => {
  // map state to props
  // important: initialValues prop will be read by redux-form
  // the keys must match the `name` property of the each form field
  return { initialValues: state.surveys.survey[0] };
};

export default connect(mapStateToProps)(FormUpdateSurvey);
