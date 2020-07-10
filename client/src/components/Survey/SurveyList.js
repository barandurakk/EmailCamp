import React from "react";
import { connect } from "react-redux";

//action
import { fetchSurveys, fetchASurvey } from "../../actions/index";

//metarial ui
import {
  List,
  ListItem,
  Divider,
  Typography,
  IconButton,
  Tooltip,
  TextField,
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Fragment } from "react";

//icons
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import SortIcon from "@material-ui/icons/Sort";

const styles = {
  listItemWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  listTitle: {
    color: "white",
  },

  listBody: {
    color: "white",
    fontSize: 12,
  },
  arrowButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
};

class SurveyList extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchSurveys();
    this.state = {
      limit: 9,
      sortReturn: 1,
    };
  }

  handleClick = (id) => {
    this.props.fetchASurvey(id);
  };

  renderSurveyList() {
    const { surveys, classes } = this.props;

    return surveys
      .sort((a, b) => (a.dateSent > b.dateSent ? -this.state.sortReturn : this.state.sortReturn))
      .slice(this.state.limit - 9, this.state.limit)
      .map((survey) => {
        return (
          <Fragment key={survey._id}>
            <ListItem
              button
              alignItems="flex-start"
              className={classes.listItemWrapper}
              onClick={() => this.handleClick(survey._id)}
            >
              <Typography component="span" variant="h6" className={classes.listTitle}>
                {survey.title}
              </Typography>

              <Typography component="span" className={classes.listBody}>
                Gönderilmiş: {new Date(survey.dateSent).toLocaleDateString()} <br />
                Son Etkileşim:
                {survey.lastResponded ? new Date(survey.lastResponded).toLocaleDateString() : "-"}
              </Typography>
            </ListItem>
            <Divider />
          </Fragment>
        );
      });
  }

  handleSkipButton = () => {
    const { surveys } = this.props;
    if (this.state.limit >= surveys.length) {
    } else {
      this.setState({
        limit: this.state.limit + 9,
      });
    }
  };
  handleBackButton = () => {
    if (this.state.limit <= 9) {
      this.setState({
        limit: 9,
      });
    } else {
      this.setState({
        limit: this.state.limit - 9,
      });
    }
  };

  handleSortButton = () => {
    this.setState({
      sortReturn: -this.state.sortReturn,
    });
  };

  render() {
    const { surveys, classes } = this.props;
    return surveys.length === 0 ? (
      <div>Yükleniyor</div>
    ) : (
      <Fragment>
        <div className={classes.arrowButtons}>
          <Tooltip title="Geri">
            <IconButton onClick={this.handleBackButton}>
              <ArrowLeftIcon color="secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Tarihe Göre Sırala">
            <IconButton onClick={this.handleSortButton}>
              <SortIcon color="secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sonraki">
            <IconButton onClick={this.handleSkipButton}>
              <ArrowRightIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </div>
        <List component="nav" aria-label="main mailbox folders">
          {this.renderSurveyList()}
        </List>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    surveys: state.surveys.surveyList,
  };
};

export default connect(mapStateToProps, { fetchSurveys, fetchASurvey })(
  withStyles(styles)(SurveyList)
);
