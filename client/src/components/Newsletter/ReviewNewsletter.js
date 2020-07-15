import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//action
import { submitNewsletter } from "../../actions/index";

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
};

class ReviewNewsletter extends React.Component {
  render() {
    const { newsFormValues, submitNewsletter, history, classes } = this.props;
    console.log(newsFormValues);
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
            onClick={() => submitNewsletter(newsFormValues, history)}
          >
            Gönder
          </Button>
        </div>
        <div>
          <div>
            <label>Anket Başlığı</label>
            <div>{newsFormValues.title}</div>
          </div>
          <div>
            <label>Konu</label>
            <div>{newsFormValues.subject}</div>
          </div>
          <div>
            <label>Email İçeriği</label>
            <div
              dangerouslySetInnerHTML={{ __html: newsFormValues.body }}
              className={classes.previewDiv}
            />
          </div>
          <div>
            <label>Alıcı Listesi</label>
            <div>{newsFormValues.recipients}</div>
          </div>
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
