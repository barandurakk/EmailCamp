import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import sanitizeHtml from "../../../utils/sanitizeHtml";

//actions
import { updateSurvey } from "../../../actions/index";

//metarial-ui
import withStyles from "@material-ui/styles/withStyles";
import { Typography, Button, Card, Divider, CardContent } from "@material-ui/core";

const styles = {
  reviewSurveyContainer: {
    width: "70%",
    margin: "auto",
  },
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

class ReviewUpdatedSurvey extends React.Component {
  handleDraftButton = (values) => {
    const { updateSurvey } = this.props;
    updateSurvey(values);
  };

  handleSubmitButton = (values) => {
    const { updateSurvey } = this.props;
    const unDraftedValues = {
      ...values,
      drafted: false,
    };
    updateSurvey(unDraftedValues);
  };

  render() {
    const { surveyUpdateFormValues, classes } = this.props;
    return (
      <div className={classes.reviewSurveyContainer}>
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
            onClick={() => this.handleDraftButton(surveyUpdateFormValues)}
            type="submit"
            variant="contained"
            color="#c20f2f"
          >
            Taslak Olarak Kaydet
          </Button>
          <Button
            className={classes.actionButtons}
            onClick={() => this.handleSubmitButton(surveyUpdateFormValues)}
            type="submit"
            variant="contained"
            color="primary"
          >
            Gönder
          </Button>
        </div>
        <Typography variant="h5" color="primary">
          Email'inizi inceleyebilirsiniz
        </Typography>

        <Card>
          <CardContent>
            <div>
              <Typography gutterBottom variant="body1" component="h2">
                Anket Başlığı
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {surveyUpdateFormValues.title}
              </Typography>
              <Divider />
            </div>
            <div>
              <Typography gutterBottom variant="body1" component="h2">
                Konu
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {surveyUpdateFormValues.subject}
              </Typography>
              <Divider />
            </div>
            <div>
              <Typography gutterBottom variant="body1" component="h2">
                Email Gövdesi
              </Typography>
              <div
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(surveyUpdateFormValues.body) }}
                className={classes.previewDiv}
              />
            </div>
            <div>
              <Typography gutterBottom variant="body1" component="h2">
                Alıcılar
              </Typography>
              <Typography gutterBottom variant="body2" component="h2">
                {surveyUpdateFormValues.recipients}
              </Typography>
              <Divider />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    surveyUpdateFormValues: state.form.surveyUpdateForm.values,
  };
};

export default connect(mapStateToProps, { updateSurvey })(
  withRouter(withStyles(styles)(ReviewUpdatedSurvey))
);
