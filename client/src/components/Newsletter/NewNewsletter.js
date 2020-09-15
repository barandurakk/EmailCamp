import React from "react";
import { reduxForm } from "redux-form";

//components
import FormNewsletter from "./FormNewsletter";
import ReviewNewsletter from "./ReviewNewsletter";

class NewNewsletter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewFormReview: false,
    };
  }

  render() {
    return (
      <div>
        {this.state.showNewFormReview ? (
          <ReviewNewsletter onCancel={() => this.setState({ showNewFormReview: false })} />
        ) : (
          <FormNewsletter onNewsSubmit={() => this.setState({ showNewFormReview: true })} />
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: "newsletterForm",
})(NewNewsletter);
