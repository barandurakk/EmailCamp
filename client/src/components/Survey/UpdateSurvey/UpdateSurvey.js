import React from "react";
import { reduxForm } from "redux-form";

//component
import ReviewUpdatedSurvey from "./ReviewUpdatedSurvey";
import FormUpdateSurvey from "./FormUpdateSurvey";

class UpdateSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormReview: false,
    };
  }

  render() {
    return (
      <div>
        {this.state.showFormReview ? (
          <ReviewUpdatedSurvey onCancel={() => this.setState({ showFormReview: false })} />
        ) : (
          <FormUpdateSurvey
            onSubmit={() => this.setState({ showFormReview: true })}
            onCancel={() => this.props.onCancel()}
          />
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyUpdateForm",
})(UpdateSurvey);
