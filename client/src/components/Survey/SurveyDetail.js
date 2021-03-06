import React, { Fragment } from "react";
import { connect } from "react-redux";
import sanitizeHtml from "../../utils/sanitizeHtml";

//actions
import { deleteASurvey } from "../../actions/index";

//component
import UpdateSurvey from "./UpdateSurvey/UpdateSurvey";

//metarial ui
import withStyles from "@material-ui/styles/withStyles";
import {
  Card,
  Typography,
  CardContent,
  Button,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
} from "@material-ui/core";

//icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const styles = {
  deleteIcon: {
    color: "red",
  },
  deleteButton: {
    float: "right",
  },
  editButton: {
    float: "right",
  },
  UpdateDialogContainer: {
    maxWidth: 1200,
  },
  answerText: {
    margin: "0px 10px 0px 10px",
  },
};

class SurveyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: false,
      openUpdate: false,
    };
  }

  handleDeleteButton = (id) => {
    this.props.deleteASurvey(id);
    this.setState({
      openDelete: false,
    });
  };

  handleDeletePopupOpen = () => {
    this.setState({
      openDelete: true,
    });
  };

  handleDeletePopupClose = () => {
    this.setState({
      openDelete: false,
    });
  };

  renderDeletePopup = (title, id) => {
    const { openDelete } = this.state;
    return (
      <Dialog open={openDelete} keepMounted onClose={this.handleDeletePopupClose}>
        <DialogTitle>{"Emin misin?"}</DialogTitle>
        <DialogContent>
          <Typography variant="h6" color="primary">
            "{title}" Adlı anketi silmek istiyor musunuz?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.handleDeletePopupClose()}
            color="secondary"
            variant="contained"
          >
            İptal
          </Button>
          <Button onClick={() => this.handleDeleteButton(id)} color="primary" variant="contained">
            SİL
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  handleUpdatePopupOpen = () => {
    this.setState({
      openUpdate: true,
    });
  };

  handleUpdatePopupClose = () => {
    this.setState({
      openUpdate: false,
    });
  };

  renderUpdatePopup = () => {
    const { openUpdate } = this.state;

    return (
      <Dialog
        open={openUpdate}
        keepMounted
        onClose={this.handleDeletePopupClose}
        maxWidth="lg"
        fullWidth={true}
      >
        <UpdateSurvey onCancel={() => this.setState({ openUpdate: false })} />
      </Dialog>
    );
  };

  renderContent = (survey) => {
    const { classes } = this.props;

    return (
      <Fragment>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {survey.title}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(survey.body) }} />

            <Tooltip title="Sil" className={classes.deleteButton}>
              <IconButton
                onClick={() => this.handleDeletePopupOpen()}
                className={classes.deleteIconWrapper}
              >
                <DeleteIcon className={classes.deleteIcon} />
              </IconButton>
            </Tooltip>
            {survey.drafted ? (
              <Tooltip
                title="Güncelle"
                className={classes.editButton}
                onClick={() => this.handleUpdatePopupOpen()}
              >
                <IconButton>
                  <EditIcon className={classes.editIcon} />
                </IconButton>
              </Tooltip>
            ) : null}
          </CardContent>

          <CardActions>
            {survey.choices.map((choice) => {
              return (
                <Typography variant="body1" className={classes.answerText}>
                  <strong>{choice.answer}:</strong> {choice.amount}
                </Typography>
              );
            })}
          </CardActions>
        </Card>
        {this.renderDeletePopup(survey.title, survey._id)}
        {this.renderUpdatePopup()}
      </Fragment>
    );
  };

  render() {
    const { survey } = this.props;

    const surveyItem = survey[0];

    return surveyItem ? this.renderContent(surveyItem) : <div>Seçim Yapınız</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    survey: state.surveys.survey,
  };
};

export default connect(mapStateToProps, { deleteASurvey })(withStyles(styles)(SurveyDetail));
