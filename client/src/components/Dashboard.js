import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//components
import SurveyList from "./Survey/SurveyList";
import SurveyDetail from "./Survey/SurveyDetail";

//metarial ui
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid, AppBar, Toolbar, Paper, Button, Chip } from "@material-ui/core";
import { Fragment } from "react";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const style = {
  dashboardNav: {
    height: 50,
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
    fontWeight: 600,
  },
  creditLabel: {
    marginLeft: 15,
  },
};

class Dashboard extends React.Component {
  render() {
    const { classes, auth } = this.props;
    return (
      <Fragment>
        <AppBar position="static" color="secondary">
          <Toolbar className={classes.dashboardNav}>
            <Button
              component={Link}
              to="/panel/yeni"
              variant="contained"
              color="primary"
              className={classes.newSurveyButton}
            >
              Oluştur
            </Button>
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
            <Paper className={classes.listPaper} elevation={3}>
              <SurveyList />
            </Paper>
          </Grid>
          <Grid item xs={8} className={classes.detailSection}>
            <div className="fixed-action-btn">
              <SurveyDetail />
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
