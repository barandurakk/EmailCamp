import React from "react";
import { connect } from "react-redux";

//metarial ui
import withStyles from "@material-ui/styles/withStyles";
import {
  Grid,
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Button,
  CardActions,
} from "@material-ui/core";

const styles = {};

class SurveyDetail extends React.Component {
  renderContent = (survey) => {
    const { classes } = this.props;
    return (
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {survey.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {survey.body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Evet: {survey.yes}
          </Button>
          <Button size="small" color="primary">
            Hayır: {survey.no}
          </Button>
        </CardActions>
      </Card>
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

export default connect(mapStateToProps)(withStyles(styles)(SurveyDetail));
