import React from "react";
import { reduxForm } from "redux-form";

//components
import FormSurvey from "./FormSurvey";
import ReviewSurvey from "./ReviewSurvey";

class NewSurvey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFormReview: false,
    };
  }

  render() {
    console.log(this.props.form);
    return (
      <div>
        {this.state.showFormReview ? (
          <ReviewSurvey onCancel={() => this.setState({ showFormReview: false })} />
        ) : (
          <FormSurvey onSubmit={() => this.setState({ showFormReview: true })} />
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm",
})(NewSurvey);
