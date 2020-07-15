import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//material ui
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import Payments from "./Payments";

const style = {
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  desktopButtons: {
    display: "flex",
    flexDirectioh: "row",
  },
  profileButton: {
    display: "flex",
  },
  displayName: {
    fontWeight: 600,
    fontSize: 14,
    color: "#fff",
    marginLeft: 10,
  },
  creditButton: {
    height: "40px",
    padding: "5px 10px 5px 10px",
    alignSelf: "center",
    marginRight: 15,
  },
  creditText: {
    fontWeight: 600,
    fontSize: 14,
    color: "#fff",
  },
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleCreditOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleCreditClose = () => {
    this.setState({
      open: false,
    });
  };

  renderCreditPopup = () => {
    const { open } = this.state;

    return (
      <Dialog open={open} keepMounted onClose={this.handleCreditClose}>
        <DialogTitle>{"Kredi Miktarını Seçiniz"}</DialogTitle>
        <DialogContent>
          <Payments />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCreditClose} color="primary" variant="contained">
            İptal
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderContent = () => {
    const { auth, classes } = this.props;
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <div className={classes.desktopButtons}>
            <Button
              color="secondary"
              variant="contained"
              className={classes.signInButton}
              href="/auth/google"
            >
              Google ile giriş yap
            </Button>
          </div>
        );
      default:
        return (
          <div className={classes.desktopButtons}>
            <Button color="secondary" variant="contained" className={classes.creditButton}>
              <Typography
                variant="subtitle1"
                className={classes.creditText}
                onClick={this.handleCreditOpen}
              >
                KREDİ YÜKLE
              </Typography>
            </Button>
            {this.renderCreditPopup()}
            <Button className={classes.profileButton} component={Link} to="/panel">
              <Avatar alt="profile-picture" src={auth.pictureUrl} />
              <Typography variant="subtitle1" className={classes.displayName} color="textSecondary">
                {auth.displayName}
              </Typography>
            </Button>
            <Button href="/api/logout">
              <Typography variant="subtitle1" className={classes.displayName} color="textSecondary">
                Çıkış
              </Typography>
            </Button>
          </div>
        );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" color="primary">
        <Toolbar className={classes.root}>
          <Typography variant="h6">EmailCamp</Typography>
          {this.renderContent()}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(withStyles(style)(Header));
