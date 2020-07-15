import React from "react";
import { connect } from "react-redux";

//action
import { fetchNewsletters, fetchANewsletter } from "../../actions/index";

//metarial ui
import { List, ListItem, Divider, Typography, IconButton, Tooltip } from "@material-ui/core";
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

class NewsletterList extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchNewsletters();
    this.state = {
      limit: 9,
      sortReturn: 1,
    };
  }

  handleClick = (id) => {
    this.props.fetchANewsletter(id);
  };

  renderNewsletterList() {
    const { newsletters, classes } = this.props;

    return newsletters
      .sort((a, b) => (a.dateSent > b.dateSent ? -this.state.sortReturn : this.state.sortReturn))
      .slice(this.state.limit - 9, this.state.limit)
      .map((newsletter) => {
        return (
          <Fragment key={newsletter._id}>
            <ListItem
              button
              alignItems="flex-start"
              className={classes.listItemWrapper}
              onClick={() => this.handleClick(newsletter._id)}
            >
              <Typography component="span" variant="h6" className={classes.listTitle}>
                {newsletter.title}
              </Typography>

              <Typography component="span" className={classes.listBody}>
                Gönderilmiş: {new Date(newsletter.dateSent).toLocaleDateString()} <br />
              </Typography>
            </ListItem>
            <Divider />
          </Fragment>
        );
      });
  }

  handleSkipButton = () => {
    const { newsletters } = this.props;
    if (this.state.limit >= newsletters.length) {
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
    const { newsletters, classes } = this.props;
    return newsletters.length === 0 ? (
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
          {this.renderNewsletterList()}
        </List>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newsletters: state.newsletters.newsletterList,
  };
};

export default connect(mapStateToProps, { fetchNewsletters, fetchANewsletter })(
  withStyles(styles)(NewsletterList)
);
