import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//components
import SurveyList from "./Survey/SurveyList";
import SurveyDetail from "./Survey/SurveyDetail";
import NewsletterList from "./Newsletter/NewsletterList";
import NewsletterDetail from "./Newsletter/NewsletterDetail";

//metarial ui
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, AppBar, Toolbar, Paper, Button, Chip } from "@material-ui/core";
import { Fragment } from "react";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const style = {
  dashboardNav: {
    height: 40,
    alignItems: "middle",
    justifyContent: "space-between",
  },
  detailSection: {
    marginTop: 50,
  },
  listSection: {
    position: "relative",
    left: "0px",
    overflowY: "scroll",
    backgroundColor: "#213E5B",
    height: "100vw",
  },
  listPaper: {
    marginTop: 15,
    backgroundColor: "#213e5b",
  },
  newSurveyButton: {
    alignSelf: "center",
    fontWeight: 400,
    marginRight: 50,
  },
  creditLabel: {
    marginLeft: 15,
  },
  selectListWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 15,
  },
  selectListButton: {
    fontSize: 14,
    color: "#fff",
    flexGrow: 2,
  },
  activeListButton: {
    backgroundColor: "#80D8FF",
    color: "#fff",
    flexGrow: 2,
  },
};

class Dashboard extends React.Component {
  state = {
    showSurveyList: true,
  };

  render() {
    const { classes, auth } = this.props;
    return (
      <Fragment>
        <AppBar position="static" color="secondary">
          <Toolbar className={classes.dashboardNav}>
            <div>
              <Button
                component={Link}
                to="/panel/anket/yeni"
                variant="contained"
                color="primary"
                className={classes.newSurveyButton}
              >
                Anket Oluştur
              </Button>
              <Button
                component={Link}
                to="/panel/newsletter/yeni"
                variant="contained"
                color="primary"
                className={classes.newSurveyButton}
              >
                Newsletter Oluştur
              </Button>
            </div>

            <Chip
              className={classes.creditLabel}
              icon={<MonetizationOnIcon />}
              label={`Kredi: ${auth === null ? "-" : auth.credits}`}
              color="primary"
            />
          </Toolbar>
        </AppBar>
        <Grid container xs={12} spacing="50px">
          <Grid item xs={4} className={classes.listSection}>
            <div className={classes.selectListWrapper}>
              <Button
                className={
                  this.state.showSurveyList ? classes.activeListButton : classes.selectListButton
                }
                onClick={() => this.setState({ showSurveyList: true })}
              >
                Anketler
              </Button>
              <Button
                className={
                  this.state.showSurveyList ? classes.selectListButton : classes.activeListButton
                }
                onClick={() => this.setState({ showSurveyList: false })}
              >
                Newsletter'lar
              </Button>
            </div>

            <Paper className={classes.listPaper} elevation={3}>
              {this.state.showSurveyList ? <SurveyList /> : <NewsletterList />}
            </Paper>
          </Grid>
          <Grid item xs={8} className={classes.detailSection}>
            <div className="fixed-action-btn">
              {this.state.showSurveyList ? <SurveyDetail /> : <NewsletterDetail />}
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(withStyles(style)(Dashboard));
