import React from "react";
import { connect } from "react-redux";

//metarial ui
import withStyles from "@material-ui/styles/withStyles";
import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Button,
  CardActions,
} from "@material-ui/core";

const styles = {};

class NewsletterDetail extends React.Component {
  renderContent = (newsletter) => {
    return (
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {newsletter.title}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: newsletter.body }} />
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  render() {
    const { newsletter } = this.props;

    return newsletter ? this.renderContent(newsletter) : <div>Seçim Yapınız</div>;
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    newsletter: state.newsletters.newsletter,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(NewsletterDetail));
