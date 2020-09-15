import React, { Fragment } from "react";
import { connect } from "react-redux";
import sanitizeHtml from "../../utils/sanitizeHtml";
import _ from "lodash";

//actions
import { deleteANewsletter } from "../../actions/index";

//metarial ui
import withStyles from "@material-ui/styles/withStyles";
import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
} from "@material-ui/core";

//icons
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  deleteIcon: {
    color: "red",
  },
  deleteButton: {
    float: "right",
  },
};

class NewsletterDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleDeleteButton = (id) => {
    this.props.deleteANewsletter(id);
    this.setState({
      open: false,
    });
  };

  handleDeletePopupOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleDeletePopupClose = () => {
    this.setState({
      open: false,
    });
  };

  renderDeletePopup = (title, id) => {
    const { open } = this.state;

    return (
      <Dialog open={open} keepMounted onClose={this.handleDeletePopupClose}>
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

  renderContent = (newsletter) => {
    const { classes } = this.props;
    return (
      <Fragment>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {newsletter.title}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(newsletter.body) }} />
              <Tooltip title="Sil" className={classes.deleteButton}>
                <IconButton
                  onClick={() => this.handleDeletePopupOpen()}
                  className={classes.deleteIconWrapper}
                >
                  <DeleteIcon className={classes.deleteIcon} />
                </IconButton>
              </Tooltip>
            </CardContent>
          </CardActionArea>
        </Card>
        {this.renderDeletePopup(newsletter.title, newsletter._id)}
      </Fragment>
    );
  };

  render() {
    const { newsletter } = this.props;

    if (_.isEmpty(newsletter) || !newsletter) {
      return <div>Seçim Yapınız</div>;
    } else {
      return this.renderContent(newsletter);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    newsletter: state.newsletters.newsletter,
  };
};

export default connect(mapStateToProps, { deleteANewsletter })(
  withStyles(styles)(NewsletterDetail)
);
