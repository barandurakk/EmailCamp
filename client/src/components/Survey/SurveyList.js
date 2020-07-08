import React from "react";
import { connect } from "react-redux";

//action
import { fetchSurveys } from "../../actions/index";

class SurveyList extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchSurveys();
  }

  renderSurveyList() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div className="card  darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Gönderim Zamanı: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
            <p className="left">
              Son Etkileşim:{" "}
              {survey.lastResponded ? new Date(survey.lastResponded).toLocaleDateString() : "-"}
            </p>
          </div>
          <div className="card-action">
            <a>Evet: {survey.yes}</a>
            <a>Hayır: {survey.no}</a>
            <a className="right">Toplam Etkileşim: {survey.yes + survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    const { surveys } = this.props;
    console.log(surveys);
    return surveys.length === 0 ? <div>Yükleniyor</div> : this.renderSurveyList();
  }
}

const mapStateToProps = (state) => {
  return {
    surveys: state.surveys,
  };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
