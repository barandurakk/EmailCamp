import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//action
import { submitSurvey } from "../../actions/index";

class ReviewSurvey extends React.Component {
  render() {
    const { surveyFormValues, submitSurvey, history } = this.props;
    return (
      <div>
        <h5>Anketinizi Onaylıyor Musunuz ?</h5>
        <div>
          <div>
            <label>Anket Başlığı</label>
            <div>{surveyFormValues.title}</div>
          </div>
          <div>
            <label>Konu</label>
            <div>{surveyFormValues.subject}</div>
          </div>
          <div>
            <label>Email İçeriği</label>
            <div>{surveyFormValues.body}</div>
          </div>
          <div>
            <label>Alıcı Listesi</label>
            <div>{surveyFormValues.recipients}</div>
          </div>
        </div>
        <button className="yellow darken-3 white-text btn-flat left" onClick={this.props.onCancel}>
          Geri Dön
        </button>
        <button
          className="green darken-3 white-text btn-flat right"
          onClick={() => submitSurvey(surveyFormValues, history)}
        >
          Gönder
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    surveyFormValues: state.form.surveyForm.values,
  };
};

export default connect(mapStateToProps, { submitSurvey })(withRouter(ReviewSurvey));
