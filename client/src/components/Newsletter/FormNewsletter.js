import React from "react";

import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import FieldNewsletter from "./FieldNewsletter";
import validateEmails from "../../utils/validateEmails";

import CSVReader from "react-csv-reader";
import TextEditor from "../TextEditor";

//material ui
import withStyles from "@material-ui/styles/withStyles";
import { Button, TextField, Typography } from "@material-ui/core";

const styles = {
  formNewsContainer: {
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
  bodyField: {
    display: "none",
  },
  activeButton: {
    backgroundColor: "#213e5b",
    color: "#fff",
  },
  hideEditor: {
    display: "none !important",
  },
};

class FormNewsletter extends React.Component {
  state = {
    showEditor: true,

    showPreview: false,
  };

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

  handleBodyValue = (editorValue) => {
    this.props.change("body", editorValue);
  };

  handleHtmlFieldChange = (event) => {
    this.props.change("body", event.target.value);
  };

  renderFields() {
    const { classes } = this.props;

    return (
      <div>
        <Field
          type="text"
          name="title"
          label="Anket Başlığı"
          component={FieldNewsletter}
          variant="outlined"
          multiline={false}
        />
        <Field
          type="text"
          name="from"
          label="Kimden"
          component={FieldNewsletter}
          variant="outlined"
          multiline={false}
        />
        <Field
          type="text"
          name="subject"
          label="Konu"
          component={FieldNewsletter}
          variant="outlined"
          multiline={false}
        />
        <Field type="text" name="body" label="İçerik" component={FieldNewsletter} />
        <Typography variant="h6" color="primary">
          Email Gövdesi
        </Typography>
        <Button
          onClick={() => this.setState({ showEditor: true })}
          className={this.state.showEditor ? classes.activeButton : ""}
        >
          Yazı
        </Button>
        <Button
          onClick={() => this.setState({ showEditor: false })}
          className={this.state.showEditor ? "" : classes.activeButton}
        >
          HTML
        </Button>

        <div>
          <div className={this.state.showEditor ? "" : classes.hideEditor}>
            <TextEditor editorValue={this.handleBodyValue} />
          </div>

          <br />
          <div className={this.state.showEditor ? classes.hideEditor : ""}>
            <TextField
              multiline
              variant="filled"
              fullWidth
              rows={10}
              placeholder="Buraya html template yapıştırabilirsiniz"
              onChange={(event) => this.handleHtmlFieldChange(event)}
            />
          </div>
        </div>

        <Field
          type="text"
          name="recipients"
          label="Alıcı Listesi (Virgülle Ayrılmış)"
          component={FieldNewsletter}
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
    const { classes, handleSubmit } = this.props;

    return (
      <div className={classes.formNewsContainer}>
        <form onSubmit={handleSubmit(this.props.onNewsSubmit)}>
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
    errors.title = "Başlık 60 karakterden fazla olamaz!";
  }

  //from
  errors.from = validateEmails(values.from || "");
  if (!values.from) {
    errors.from = "Kimden kısmı boş olamaz!";
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
  form: "newsletterForm",
  enableReinitialize: true,
  destroyOnUnmount: false,
})(withStyles(styles)(FormNewsletter));
