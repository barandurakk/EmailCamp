import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//action
import { submitSurvey } from "../../actions/index";

//metarial-ui
import withStyles from "@material-ui/styles/withStyles";
import { Typography, Button } from "@material-ui/core";

const styles = {
  previewDiv: {
    marginTop: 25,
    marginBottom: 25,
    border: "solid 2px #213e5b",
    maxHeight: "400px",
    overflowY: "scroll",
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
};

class ReviewSurvey extends React.Component {
  render() {
    const { surveyFormValues, submitSurvey, history, classes } = this.props;
    return (
      <div>
        <Typography variant="h4" color="primary">
          Email'inizi inceleyebilirsiniz
        </Typography>
        <div className={classes.formActionWrapper}>
          <Button
            className={classes.actionButtons}
            onClick={this.props.onCancel}
            variant="contained"
            color="primary"
          >
            Geri Dön
          </Button>
          <Button
            className={classes.actionButtons}
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => submitSurvey(surveyFormValues, history)}
          >
            Gönder
          </Button>
        </div>
        <div>
          <div>
            <label>Anket Başlığı</label>
            <div>{surveyFormValues.title}</div>
          </div>
          <div>
            <label>Konu</label>
            <div>{surveyFormValues.subject}</div>
          </div>
          <div>
            <label>Email İçeriği</label>
            <div>{surveyFormValues.body}</div>
          </div>
          <div>
            <label>Alıcı Listesi</label>
            <div>{surveyFormValues.recipients}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    surveyFormValues: state.form.surveyForm.values,
  };
};

export default connect(mapStateToProps, { submitSurvey })(
  withRouter(withStyles(styles)(ReviewSurvey))
);
