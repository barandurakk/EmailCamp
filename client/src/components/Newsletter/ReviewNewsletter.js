import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import sanitizeHtml from "../../utils/sanitizeHtml";

//action
import { submitNewsletter } from "../../actions/index";

//metarial-ui
import withStyles from "@material-ui/styles/withStyles";
import { Typography, Button, Card, CardContent, Divider } from "@material-ui/core";

const styles = {
  reviewNewsContainer: {
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

class ReviewNewsletter extends React.Component {
  render() {
    const { newsFormValues, submitNewsletter, history, classes } = this.props;
    console.log(newsFormValues);

    return (
      <div className={classes.reviewNewsContainer}>
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
            onClick={() => submitNewsletter(newsFormValues, history)}
          >
            Gönder
          </Button>
        </div>
        <Typography variant="h5" color="primary">
          Email'inizi inceleyebilirsiniz
        </Typography>
        <div>
          <Card>
            <CardContent>
              <div>
                <Typography gutterBottom variant="body1" component="h2">
                  Newsletter Başlığı
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {newsFormValues.title}
                </Typography>
                <Divider />
              </div>
              <div>
                <Typography gutterBottom variant="body1" component="h2">
                  Konu
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {newsFormValues.subject}
                </Typography>
                <Divider />
              </div>
              <div>
                <Typography gutterBottom variant="body1" component="h2">
                  Email Gövdesi
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(newsFormValues.body) }} />
              </div>
              <div>
                <Typography gutterBottom variant="body1" component="h2">
                  Alıcılar
                </Typography>
                <Typography gutterBottom variant="body2" component="h2">
                  {newsFormValues.recipients}
                </Typography>
                <Divider />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newsFormValues: state.form.newsletterForm.values,
  };
};

export default connect(mapStateToProps, { submitNewsletter })(
  withRouter(withStyles(styles)(ReviewNewsletter))
);
